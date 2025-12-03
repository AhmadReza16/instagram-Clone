from django.db import models
from django.conf import settings
from django.utils import timezone


class Like(models.Model):
    """
    Like model resides in likes app.
    Each Like links a user -> post. A user can like a post exactly once.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="likes"  # user's likes (user.likes)
    )
    post = models.ForeignKey(
        "posts.Post",
        on_delete=models.CASCADE,
        related_name="likes"  # post.likes
    )
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("user", "post")
        indexes = [
            models.Index(fields=["post"]),
            models.Index(fields=["user"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} likes Post({self.post_id})"
