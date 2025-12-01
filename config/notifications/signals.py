from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.apps import apps
from django.conf import settings

from .models import Notification

UserModel = settings.AUTH_USER_MODEL

# Utility: helper to create notification
def _create_notification(sender_user, recipient_user, ntype, post=None, comment=None, message=None, data=None):
    """
    sender_user: User instance (actor) or None
    recipient_user: User instance (receiver)
    ntype: string (one of Notification.NOTI_* constants)
    post: Post instance or None
    comment: Comment instance or None
    """
    if not recipient_user:
        return None
    post_id = getattr(post, "id", None) if post is not None else None
    comment_id = getattr(comment, "id", None) if comment is not None else None
    notif = Notification.objects.create(
        sender=sender_user,
        recipient=recipient_user,
        notification_type=ntype,
        post_id=post_id,
        comment_id=comment_id,
        message=message or "",
        data=data or {},
    )
    return notif


# Connect to Like model create/delete
@receiver(post_save)
def like_post_save(sender, instance, created, **kwargs):
    """
    When a Like is created → notify post owner
    Expect posts.Like model with fields: user (FK), post (FK)
    """
    # lazy import to avoid circular import
    if sender.__name__ != "Like":
        return

    if not created:
        return

    try:
        Post = apps.get_model("posts", "Post")
    except LookupError:
        return

    # instance is Like
    post = getattr(instance, "post", None)
    actor = getattr(instance, "user", None)
    if post and actor and post.user.id != actor.id:
        _create_notification(
            sender_user=actor,
            recipient_user=post.user,
            ntype=Notification.NOTI_LIKE,
            post=post,
            message=f"{getattr(actor, 'username', 'Someone')} liked your post."
        )


# Connect to Comment create
@receiver(post_save)
def comment_post_save(sender, instance, created, **kwargs):
    """
    When a Comment is created → notify post owner (and optionally parent comment owner)
    Expect posts.Comment model with fields: user, post, text, (optional parent)
    """
    if sender.__name__ != "Comment":
        return

    if not created:
        return

    post = getattr(instance, "post", None)
    actor = getattr(instance, "user", None)
    if post and actor and post.user.id != actor.id:
        _create_notification(
            sender_user=actor,
            recipient_user=post.user,
            ntype=Notification.NOTI_COMMENT,
            post=post,
            comment=instance,
            message=f"{getattr(actor, 'username', 'Someone')} commented: {str(instance.text)[:80]}"
        )

    # if comment has parent (reply), notify parent comment's owner (if different)
    parent = getattr(instance, "parent", None)
    if parent:
        parent_user = getattr(parent, "user", None)
        if parent_user and parent_user.id != actor.id:
            _create_notification(
                sender_user=actor,
                recipient_user=parent_user,
                ntype=Notification.NOTI_COMMENT,
                post=post,
                comment=instance,
                message=f"{getattr(actor, 'username', 'Someone')} replied to your comment."
            )


# Connect to SavedPost create
@receiver(post_save)
def savedpost_post_save(sender, instance, created, **kwargs):
    """
    When a SavedPost is created → notify post owner (optional)
    Expect posts.SavedPost model with fields: user, post
    """
    if sender.__name__ != "SavedPost":
        return

    if not created:
        return

    post = getattr(instance, "post", None)
    actor = getattr(instance, "user", None)
    if post and actor and post.user.id != actor.id:
        _create_notification(
            sender_user=actor,
            recipient_user=post.user,
            ntype=Notification.NOTI_SAVE,
            post=post,
            message=f"{getattr(actor, 'username', 'Someone')} saved your post."
        )


# Connect to Follow create
@receiver(post_save)
def follow_post_save(sender, instance, created, **kwargs):
    """
    When a Follow is created → notify the followed user
    Expect users.Follow model with fields: follower, following
    """
    if sender.__name__ != "Follow":
        return

    if not created:
        return

    follower = getattr(instance, "follower", None)
    following = getattr(instance, "following", None)
    if follower and following and follower.id != following.id:
        _create_notification(
            sender_user=follower,
            recipient_user=following,
            ntype=Notification.NOTI_FOLLOW,
            message=f"{getattr(follower, 'username', 'Someone')} started following you."
        )


# Optional: cleanup notifications when related objects deleted (e.g. delete post → delete related notifications)
@receiver(post_delete)
def related_object_delete_cleanup(sender, instance, **kwargs):
    # When Post or Comment deleted, delete notifications that point to them
    if sender.__name__ == "Post":
        Notification.objects.filter(post_id=getattr(instance, "id", None)).delete()
    elif sender.__name__ == "Comment":
        Notification.objects.filter(comment_id=getattr(instance, "id", None)).delete()
