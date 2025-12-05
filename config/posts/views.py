from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Count
from django.shortcuts import get_object_or_404

from .models import Post
from .serializers import (
    PostSerializer, PostCreateSerializer,

)

# Create / List posts
class PostListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all().select_related('user').prefetch_related('images', 'comments', 'likes', 'hashtags')
    serializer_class = PostSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostCreateSerializer
        return PostSerializer

    def perform_create(self, serializer):
        return serializer.save()


# Retrieve / Delete a single post
class PostDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all().select_related('user').prefetch_related('images', 'comments', 'likes', 'hashtags')
    serializer_class = PostSerializer


# Feed view (posts by users current user follows)
class FeedView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        # توجه: فرض بر این است که مدل Follow در اپ users دارد
        # و related_name برای فالوهایی که این user انجام داده 'following_set' است
        following_ids = user.following_set.values_list('following_id', flat=True)
        return Post.objects.filter(user__id__in=following_ids).select_related('user').prefetch_related('images', 'comments', 'likes').order_by('-created_at')

    
# Explore view (popular posts)
class ExploreView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        # score = likes_count + comments_count
        qs = Post.objects.annotate(
            likes_count=Count('likes'),
            comments_count=Count('comments')
        ).order_by('-likes_count', '-comments_count', '-created_at')[:50]
        return qs