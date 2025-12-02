from django.db import models
from django.conf import settings
from django.utils import timezone


class Follow(models.Model):
    """
    follower: the user who follows (actor)
    following: the user being followed (target)
    related_name choices are set to avoid clashes with other apps.
    """

    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="following_set"
    )
    following = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="followers_set"
    )
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("follower", "following")
        indexes = [
            models.Index(fields=["follower"]),
            models.Index(fields=["following"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.follower} → {self.following}"
    
    def save(self, *args, **kwargs):
        if self.follower == self.following:
            raise ValueError("Users cannot follow themselves.")
        super().save(*args, **kwargs)

