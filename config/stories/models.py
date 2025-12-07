from django.db import models
from users.models import User
from django.conf import settings

User = settings.AUTH_USER_MODEL

def story_media_path(instance, filename):
    return f"stories/{instance.owner.id}/{filename}"


def highlight_cover_path(instance, filename):
    return f"stories/highlights/{instance.owner.id}/{filename}"


REACTION_CHOICES = [
    ('❤️', 'Heart'),
    ('🔥', 'Fire'),
    ('😂', 'Laugh'),
    ('😮', 'Surprised'),
    ('😢', 'Sad'),
    ('👏', 'Clap'),
]

### STORY MODEL
class Story(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories")
    media = models.FileField(upload_to=story_media_path)
    caption = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_highlighted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner} - Story {self.id}"


### STORY VIEWERS (Seen)
class StoryView(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="views")
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="viewed_stories")
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('story', 'viewer')

    def __str__(self):
        return f"{self.viewer.username} viewed story {self.story.id}"
    
### STORY MENTIONS
class StoryMention(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="mentions")
    mentioned_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mentioned_in_stories")

    def __str__(self):
        return f"{self.story.id} -> {self.mentioned_user}"

### STORY REACTIONS (EMOJIS)
class StoryReaction(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="reactions")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="story_reacted")
    emoji = models.CharField(max_length=10, choices=REACTION_CHOICES)
    reacted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('story', 'user')

    def __str__(self):
        return f"{self.user} -> {self.emoji}"
    
class StoryMention(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="mentions")
    mentioned_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mentioned_in_stories")
    mentioned_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.mentioned_user.username} mentioned in story {self.story.id}"
    

def highlight_cover_path(instance, filename):
    return f"stories/highlights/{instance.owner.id}/{filename}"

### HIGHLIGHTS
class Highlight(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="highlights")
    title = models.CharField(max_length=50)
    cover = models.ImageField(upload_to=highlight_cover_path, blank=True, null=True)
    stories = models.ManyToManyField(Story, related_name="highlighted_in", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title






    
# class StoryComment(models.Model):
#     story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="comments")
#     commenter = models.ForeignKey(User, on_delete=models.CASCADE)
#     comment_text = models.TextField()
#     commented_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.commenter.username} commented on story {self.story.id}"
    
    
# class StoryArchive(models.Model):
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="story_archives")
#     story = models.ForeignKey(Story, on_delete=models.CASCADE)
#     archived_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('owner', 'story')  # prevent duplicate archives

#     def __str__(self):
#         return f"{self.owner.username} archived story {self.story.id}"
    
# class StoryShare(models.Model):
#     story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="shares")
#     shared_by = models.ForeignKey(User, on_delete=models.CASCADE)
#     shared_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.shared_by.username} shared story {self.story.id}"
    
# class StoryTag(models.Model):
#     story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="tags")
#     tagged_user = models.ForeignKey(User, on_delete=models.CASCADE)
#     tagged_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('story', 'tagged_user')  # prevent duplicate tags

#     def __str__(self):
#         return f"{self.tagged_user.username} tagged in story {self.story.id}"
    
# class StoryNotification(models.Model):
#     story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="notifications")
#     recipient = models.ForeignKey(User, on_delete=models.CASCADE)
#     notification_type = models.CharField(max_length=50)  # e.g., 'view', 'reaction', 'comment'
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_read = models.BooleanField(default=False)

#     def __str__(self):
#         return f"Notification for {self.recipient.username} about story {self.story.id}"
    
# class StorySettings(models.Model):
#     owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="story_settings")
#     allow_reactions = models.BooleanField(default=True)
#     allow_comments = models.BooleanField(default=True)
#     highlight_visibility = models.CharField(max_length=50, default="public")  # e.g., 'public', 'followers', 'private'

#     def __str__(self):
#         return f"{self.owner.username} story settings"
