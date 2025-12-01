from django.db import models
from django.conf import settings
from django.utils import timezone

# If using Django < 3.1, use from django.contrib.postgres.fields import JSONField
try:
    # Django 3.1+ has built-in JSONField for all DB backends
    from django.db.models import JSONField
except ImportError:
    from django.contrib.postgres.fields import JSONField  # type: ignore

User = settings.AUTH_USER_MODEL


class Notification(models.Model):
    """
    A flexible notification model suitable for social events:
    - sender/actor: the user who caused the notification
    - recipient: the user who receives the notification
    - notification_type: pre-defined choices (like, comment, follow, save, mention, etc.)
    - optional links to Post/Comment (if relevant)
    - data: arbitrary JSON for future extensibility (e.g. {'caption': '...'})
    """

    NOTI_LIKE = "like"
    NOTI_COMMENT = "comment"
    NOTI_FOLLOW = "follow"
    NOTI_SAVE = "save"
    NOTI_MENTION = "mention"
    NOTI_TYPES = (
        (NOTI_LIKE, "Like"),
        (NOTI_COMMENT, "Comment"),
        (NOTI_FOLLOW, "Follow"),
        (NOTI_SAVE, "Save"),
        (NOTI_MENTION, "Mention"),
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_notifications",
        null=True,
        blank=True,
        help_text="The user who triggered the notification (actor). Can be null for system notifications.",
    )
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications",
        help_text="The user who receives the notification.",
    )

    notification_type = models.CharField(max_length=20, choices=NOTI_TYPES)
    # Optional links to Post or Comment (use string references to avoid circular imports)
    post_id = models.PositiveIntegerField(null=True, blank=True, help_text="Primary key of related post, if any.")
    comment_id = models.PositiveIntegerField(null=True, blank=True, help_text="Primary key of related comment, if any.")

    # human-readable short text (can be generated automatically but stored for convenience)
    message = models.CharField(max_length=255, blank=True)

    # flexible extra data
    data = JSONField(null=True, blank=True)

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["recipient", "-created_at"]),
            models.Index(fields=["is_read"]),
        ]

    def __str__(self):
        return f"Notification({self.notification_type}) -> {self.recipient}"

    def mark_read(self):
        if not self.is_read:
            self.is_read = True
            self.save(update_fields=["is_read"])

    def mark_unread(self):
        if self.is_read:
            self.is_read = False
            self.save(update_fields=["is_read"])
