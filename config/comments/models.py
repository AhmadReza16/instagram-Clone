from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Comment(models.Model):
    """
    Main Comment model:
    - parent: null for top-level comments, points to Comment for replies (one level)
    - we enforce replies only to top-level comments (no reply-to-reply)
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comments"
    )
    post = models.ForeignKey(
        "posts.Post",
        on_delete=models.CASCADE,
        related_name="comments"
    )
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="replies",
        help_text="If set, this comment is a reply to parent (only one level deep)."
    )
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["post"]),
            models.Index(fields=["user"]),
        ]

    def __str__(self):
        if self.parent:
            return f"Reply({self.id}) by {self.user} on Comment({self.parent_id})"
        return f"Comment({self.id}) by {self.user} on Post({self.post_id})"

    @property
    def is_reply(self):
        return self.parent is not None
    