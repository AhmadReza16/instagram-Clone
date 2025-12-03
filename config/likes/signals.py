from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps

from .models import Like


@receiver(post_save, sender=Like)
def like_created(sender, instance, created, **kwargs):
    if not created:
        return

    # avoid notifying when user likes their own post
    post = instance.post
    actor = instance.user
    if post.user.id == actor.id:
        return

    # create notification in notifications app if exists
    Notification = apps.get_model('notifications', 'Notification')
    if Notification is None:
        return

    try:
        Notification.objects.create(
            sender=actor,
            recipient=post.user,
            notification_type='like',
            post_id=post.id,
            message=f"{getattr(actor, 'username', 'Someone')} liked your post."
        )
    except Exception:
        # Do not raise to avoid breaking the like process
        pass


@receiver(post_delete, sender=Like)
def like_deleted(sender, instance, **kwargs):
    # remove corresponding like notifications (if any)
    Notification = apps.get_model('notifications', 'Notification')
    if Notification is None:
        return
    try:
        Notification.objects.filter(
            sender=instance.user,
            recipient=instance.post.user,
            notification_type='like',
            post_id=instance.post.id
        ).delete()
    except Exception:
        pass
