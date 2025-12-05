from django.db import models
from django.conf import settings
from posts.models import Post

User = settings.AUTH_USER_MODEL

class SavedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_posts')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='saved_by_users')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')   # یک پست را دوبار ذخیره نکند

    def __str__(self):
        return f'{self.user} saved {self.post}'