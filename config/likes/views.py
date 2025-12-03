from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from .models import Like
from .serializers import LikeSerializer, SimpleUserSerializer
from django.contrib.auth import get_user_model
from posts.models import Post
from posts.serializers import PostSerializer 
User = get_user_model()


class ToggleLikeView(generics.GenericAPIView):
    """
    Toggle like/unlike.
    Request: POST {"post": <post_id>}
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get("post")
        if not post_id:
            return Response({"detail": "post field is required."}, status=status.HTTP_400_BAD_REQUEST)

        post = get_object_or_404(Post, pk=post_id)

        existing = Like.objects.filter(user=user, post=post).first()
        if existing:
            existing.delete()
            return Response({"liked": False}, status=status.HTTP_200_OK)

        try:
            like = Like.objects.create(user=user, post=post)
        except IntegrityError:
            # Race condition: another request created the like concurrently
            like = Like.objects.filter(user=user, post=post).first()
            if like:
                return Response({"liked": True}, status=status.HTTP_200_OK)
            return Response({"detail": "Could not like"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"liked": True, "id": like.id}, status=status.HTTP_201_CREATED)


class PostLikesListView(generics.ListAPIView):
    """
    List users who liked a specific post.
    URL: /posts/<post_id>/likes/
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SimpleUserSerializer

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        user_ids = Like.objects.filter(post_id=post_id).values_list("user_id", flat=True)
        return User.objects.filter(id__in=user_ids)


class UserLikedPostsView(generics.ListAPIView):
    """
    List posts that a specific user has liked.
    URL: /users/<user_id>/liked-posts/
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        post_ids = Like.objects.filter(user_id=user_id).values_list("post_id", flat=True)
        return Post.objects.filter(id__in=post_ids).order_by("-id")


class IsLikedView(generics.GenericAPIView):
    """
    Check whether request.user liked given post.
    GET /is-liked/<post_id>/
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, post_id):
        exists = Like.objects.filter(user=request.user, post_id=post_id).exists()
        return Response({"is_liked": exists})
