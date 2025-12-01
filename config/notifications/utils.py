from .models import Notification


def create_notification(sender, recipient, notification_type, post=None, comment=None, text=""):
    if sender == recipient:
        return None  # جلوگیری از نوتیفیکیشن به خود

    return Notification.objects.create(
        sender=sender,
        recipient=recipient,
        notification_type=notification_type,
        post=post,
        comment=comment,
        text=text
    )