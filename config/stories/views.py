from datetime import timedelta
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status , generics

from .models import (
    Story, StoryView, StoryMention, StoryReaction, Highlight
)
from users.models import User
from follow.models import Follow   #   اپ فالو که ساختیم 
from .serializers import (
    StorySeenSerializer, StorySerializer, StoryMentionSerializer,
    StoryReactionSerializer, StoryViewSerializer,
    HighlightSerializer
)



### CREATE STORY
class CreateStoryView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StorySerializer

    def perform_create(self, serializer):
        expires = timezone.now() + timezone.timedelta(hours=24)
        serializer.save(owner=self.request.user, expires_at=expires)


### VIEW STORY (register view)
class ViewStoryAPIView(generics.CreateAPIView):
    serializer_class = StoryViewSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, story_id):
        story = Story.objects.get(id=story_id)
        StoryView.objects.get_or_create(story=story, viewer=request.user)
        return Response({"message": "View registered"})

### ADD REACTION
class AddReactionAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StoryReactionSerializer

    def post(self, request, story_id):
        story = Story.objects.get(id=story_id)
        emoji = request.data.get('emoji')

        reaction, created = StoryReaction.objects.update_or_create(
            story=story,
            user=request.user,
            defaults={'emoji': emoji}
        )
        return Response(StoryReactionSerializer(reaction).data)


### MENTION USER IN STORY
class AddMentionAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StoryMentionSerializer

    def post(self, request, story_id):
        story = Story.objects.get(id=story_id)
        mentioned_user = request.data.get('mentioned_user')

        mention = StoryMention.objects.create(
            story=story,
            mentioned_user_id=mentioned_user
        )
        return Response(StoryMentionSerializer(mention).data)


### CREATE HIGHLIGHT
class CreateHighlightView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HighlightSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

### ADD STORY TO HIGHLIGHT
class AddStoryToHighlightView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HighlightSerializer
    queryset = Highlight.objects.all()

    def post(self, request, highlight_id, story_id):
        highlight = Highlight.objects.get(id=highlight_id)
        story = Story.objects.get(id=story_id)
        highlight.stories.add(story)
        return Response({"message": "Story added to highlight"})
    
### REMOVE STORY FROM HIGHLIGHT
class RemoveStoryFromHighlightView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HighlightSerializer
    queryset = Highlight.objects.all()

    def post(self, request, highlight_id, story_id):
        highlight = Highlight.objects.get(id=highlight_id)
        story = Story.objects.get(id=story_id)
        highlight.stories.remove(story)
        return Response({"message": "Story removed from highlight"})

class StoryFeedView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StorySerializer

    def get_queryset(self):
        user = self.request.user
        following_users = Follow.objects.filter(follower=user).values_list('following', flat=True)
        now = timezone.now()
        return Story.objects.filter(
            owner__in=following_users,
            expires_at__gt=now
        ).order_by('-created_at')
    
class StorySeenView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StorySeenSerializer

    def get_queryset(self):
        user = self.request.user
        return StoryView.objects.filter(story__owner=user).order_by('-viewed_at')
    
class UserHighlightsView(APIView):
    def get(self, request, username):
        # username
        user = get_object_or_404(User, username=username)
        
        # گرفتن هایلایت‌های کاربر
        highlights = Highlight.objects.filter(owner=user).order_by('-created_at')
        
        # serialize 
        serializer = HighlightSerializer(highlights, many=True)
        return Response(serializer.data)