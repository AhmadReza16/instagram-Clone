from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Count
from django.shortcuts import get_object_or_404

from .models import Post, Comment, Like, SavedPost, Notification
from .serializers import (
    PostSerializer, PostCreateSerializer,
    CommentSerializer, LikeSerializer, SavedPostSerializer,
    NotificationSerializer
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


# Comment Create
class CommentCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        # create notification
        if comment.post.user != self.request.user:
            Notification.objects.create(
                sender=self.request.user,
                receiver=comment.post.user,
                notification_type='comment',
                post=comment.post,
                text=f"{self.request.user.username} commented: {comment.text[:100]}"
            )
        return comment

# Like toggle (create/delete)
class LikeToggleView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get('post')
        if not post_id:
            return Response({'detail': 'post field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        post = get_object_or_404(Post, pk=post_id)
        existing = Like.objects.filter(user=user, post=post).first()
        if existing:
            existing.delete()
            return Response({'liked': False}, status=status.HTTP_200_OK)
        else:
            like = Like.objects.create(user=user, post=post)
            # notification
            if post.user != user:
                Notification.objects.create(
                    sender=user,
                    receiver=post.user,
                    notification_type='like',
                    post=post
                )
            return Response({'liked': True}, status=status.HTTP_201_CREATED)



# Save toggle
class SaveToggleView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SavedPostSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get('post')
        if not post_id:
            return Response({'detail': 'post field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        post = get_object_or_404(Post, pk=post_id)
        existing = SavedPost.objects.filter(user=user, post=post).first()
        if existing:
            existing.delete()
            return Response({'saved': False}, status=status.HTTP_200_OK)
        else:
            sp = SavedPost.objects.create(user=user, post=post)
            # optional notification for save
            if post.user != user:
                Notification.objects.create(
                    sender=user,
                    receiver=post.user,
                    notification_type='save',
                    post=post
                )
            return Response({'saved': True}, status=status.HTTP_201_CREATED)




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