import re
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

from .models import Comment

MENTION_RE = re.compile(r'@(?P<username>[A-Za-z0-9_.]+)')

@receiver(post_save, sender=Comment)
def on_comment_created(sender, instance, created, **kwargs):
    """
    When a comment is created:
    - notify post owner (if not the commenter)
    - if reply -> notify parent comment owner (if different)
    - parse mentions like @username and notify mentioned users
    """
    if not created:
        return

    # lazy get models
    Notification = apps.get_model("notifications", "Notification")
    User = apps.get_model("users", "User")
    Post = apps.get_model("posts", "Post")

    actor = instance.user
    post = instance.post

    # notify post owner
    try:
        if post.user.id != actor.id and Notification is not None:
            Notification.objects.create(
                sender=actor,
                recipient=post.user,
                notification_type="comment",
                post=post,
                comment=instance,
                message=f"{getattr(actor, 'username', 'Someone')} commented on your post."
            )
    except Exception:
        pass

    # if reply -> notify parent comment owner
    if instance.parent:
        try:
            parent_owner = instance.parent.user
            if parent_owner.id != actor.id and Notification is not None:
                Notification.objects.create(
                    sender=actor,
                    recipient=parent_owner,
                    notification_type="reply",
                    post=post,
                    comment=instance,
                    message=f"{getattr(actor, 'username', 'Someone')} replied to your comment."
                )
        except Exception:
            pass

    # parse mentions in text and notify mentioned users
    text = instance.text or ""
    mentions = set([m.group("username") for m in MENTION_RE.finditer(text)])
    if mentions:
        for uname in mentions:
            try:
                user_obj = User.objects.filter(username=uname).first()
                if not user_obj:
                    continue
                # avoid notifying actor or duplicate
                if user_obj.id == actor.id:
                    continue
                if Notification is None:
                    continue
                Notification.objects.create(
                    sender=actor,
                    recipient=user_obj,
                    notification_type="mention",
                    post=post,
                    comment=instance,
                    message=f"{getattr(actor,'username','Someone')} mentioned you in a comment."
                )
            except Exception:
                pass
