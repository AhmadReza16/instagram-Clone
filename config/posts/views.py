from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta

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
    pagination_class = None  # Disable pagination for now

    def get_queryset(self):
        user = self.request.user
        try:
            # Get following IDs
            following_ids = list(user.following_set.values_list('following_id', flat=True))
            
            if following_ids:
                # User has follows - return feed posts
                return Post.objects.filter(
                    user__id__in=following_ids
                ).select_related('user').prefetch_related(
                    'images', 'comments', 'likes', 'hashtags'
                ).order_by('-created_at')
            else:
                # User has no follows - return suggested posts
                return self.get_suggested_posts(user)
        except Exception as e:
            print(f"FeedView Error: {e}")
            import traceback
            traceback.print_exc()
            return Post.objects.none()

    def get_suggested_posts(self, user):
        """
        برای کاربران جدید که کسی رو فالو نکردند
        پست های پیشنهادی نشان بده
        """
        try:
            # Get user's liked post IDs
            liked_post_ids = list(user.likes.values_list('post_id', flat=True))
            
            # Exclude user's own posts and already liked posts
            excluded_ids = list(
                Post.objects.filter(user=user).values_list('id', flat=True)
            ) + liked_post_ids
            
            # Get posts from last 7 days
            one_week_ago = timezone.now() - timedelta(days=7)
            
            # Get all posts, excluding user's own and already liked
            suggested = Post.objects.filter(
                created_at__gte=one_week_ago
            ).exclude(
                id__in=excluded_ids
            ).select_related('user').prefetch_related(
                'images', 'comments', 'likes', 'hashtags'
            ).order_by('-created_at')[:20]
            
            return suggested
        except Exception as e:
            print(f"get_suggested_posts Error: {e}")
            import traceback
            traceback.print_exc()
            return Post.objects.none()

    
# Explore view (popular posts)
class ExploreView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    pagination_class = None  # Disable pagination for now

    def get_queryset(self):
        # Return popular posts
        try:
            return Post.objects.select_related('user').prefetch_related(
                'images', 'comments', 'likes', 'hashtags'
            ).order_by('-created_at')[:50]
        except Exception as e:
            print(f"ExploreView Error: {e}")
            import traceback
            traceback.print_exc()
            return Post.objects.none()


# Suggested Posts view (برای صفحه Explore و جایی که نیاز به پیشنهادات داریم)
class SuggestedPostsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    pagination_class = None  # Disable pagination for now

    def get_queryset(self):
        user = self.request.user
        
        try:
            # Get user's liked post IDs
            liked_post_ids = list(user.likes.values_list('post_id', flat=True))
            
            # Exclude user's own posts and already liked posts
            excluded_ids = list(
                Post.objects.filter(user=user).values_list('id', flat=True)
            ) + liked_post_ids
            
            # Get user's hashtags if they have posts
            user_posts = Post.objects.filter(user=user)
            user_hashtag_ids = list(
                user_posts.values_list('hashtags__id', flat=True).distinct()
            ) if user_posts.exists() else []
            
            # If user has posted before, suggest similar posts
            if user_hashtag_ids:
                suggested = Post.objects.filter(
                    hashtags__id__in=user_hashtag_ids
                ).exclude(
                    id__in=excluded_ids
                ).distinct().select_related('user').prefetch_related(
                    'images', 'comments', 'likes', 'hashtags'
                ).order_by('-created_at')[:50]
            else:
                # Otherwise suggest popular posts
                suggested = Post.objects.exclude(
                    id__in=excluded_ids
                ).select_related('user').prefetch_related(
                    'images', 'comments', 'likes', 'hashtags'
                ).order_by('-created_at')[:50]
            
            return suggested
        except Exception as e:
            print(f"SuggestedPostsView Error: {e}")
            import traceback
            traceback.print_exc()
            return Post.objects.none()