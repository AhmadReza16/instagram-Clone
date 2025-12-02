from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps
from django.conf import settings

from .models import Follow

UserModel = settings.AUTH_USER_MODEL

def _create_follow_notification(follower, following):
    """
    Create a follow notification using notifications.Notification model
    We use apps.get_model to avoid direct import cycles.
    """
    Notification = apps.get_model('notifications', 'Notification')
    if Notification is None:
        return

    # avoid notifying self (should be prevented earlier)
    if follower.id == following.id:
        return

    # create notification
    try:
        Notification.objects.create(
            sender=follower,
            recipient=following,
            notification_type='follow',
            message=f"{getattr(follower, 'username', 'Someone')} started following you."
        )
    except Exception:
        # fail silently to avoid breaking follow operation
        pass


@receiver(post_save, sender=Follow)
def on_follow_create(sender, instance, created, **kwargs):
    if not created:
        return
    follower = instance.follower
    following = instance.following
    _create_follow_notification(follower, following)


@receiver(post_delete, sender=Follow)
def on_follow_delete(sender, instance, **kwargs):
    # Optionally remove follow-notifications created for this follow
    Notification = apps.get_model('notifications', 'Notification')
    if Notification is None:
        return
    try:
        Notification.objects.filter(
            sender=instance.follower,
            recipient=instance.following,
            notification_type='follow'
        ).delete()
    except Exception:
        pass
    
# Note: Depending on the notification system design, you might want to keep
# the notification even after unfollowing. Adjust as necessary.
