from rest_framework import serializers
from .models import Story, StoryView, StoryMention, StoryReaction, Highlight 
from users.models import User

class StoryMentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryMention
        fields = ['id', 'mentioned_user']


class StoryReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryReaction
        fields = ['id', 'user', 'emoji', 'reacted_at']

class StoryViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryView
        fields = ['id', 'viewer', 'viewed_at']

class StorySerializer(serializers.ModelSerializer):
    mentions = StoryMentionSerializer(many=True, read_only=True)
    reactions = StoryReactionSerializer(many=True, read_only=True)
    views = StoryViewSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = [
            'id', 'owner', 'media', 'caption', 'created_at',
            'expires_at', 'mentions', 'reactions', 'views'
        ]
        read_only_fields = ['owner']


class HighlightSerializer(serializers.ModelSerializer):
    stories = StorySerializer(many=True, read_only=True)

    class Meta:
        model = Highlight
        fields = ['id', 'title', 'cover', 'stories', 'created_at']