from django.contrib import admin
from .models import Story, StoryView, StoryMention, StoryReaction, Highlight

admin.site.register(Story)
admin.site.register(StoryView)
admin.site.register(StoryMention)
admin.site.register(StoryReaction)
admin.site.register(Highlight)


