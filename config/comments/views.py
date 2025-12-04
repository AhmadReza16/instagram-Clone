from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Comment
from .serializers import (
    CommentSerializer, CommentCreateSerializer, CommentUpdateSerializer
)

class PostCommentsListCreateView(generics.ListCreateAPIView):
    """
    GET: list comments for a post (top-level comments with their replies)
    POST: create a comment or a reply (if 'parent' provided)
    URL: /posts/<post_id>/comments/
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CommentCreateSerializer
        return CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        # top-level comments only
        return Comment.objects.filter(post_id=post_id, parent__isnull=True, is_deleted=False).select_related("user").prefetch_related("replies__user")

    def perform_create(self, serializer):
        # we need to ensure post is included from URL or body
        post_id = self.kwargs.get("post_id")
        if not post_id and not serializer.validated_data.get("post"):
            raise serializer.ValidationError({"post": "This field is required."})
        # attach post from URL if not provided
        if not serializer.validated_data.get("post"):
            from posts.models import Post
            post = get_object_or_404(Post, pk=post_id)
            serializer.validated_data["post"] = post
        return serializer.save()


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /comments/<pk>/
    PATCH /comments/<pk>/  (only owner can update)
    DELETE /comments/<pk>/ (soft delete by owner or staff)
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = Comment.objects.all().select_related("user", "post").prefetch_related("replies")
    serializer_class = CommentSerializer

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return CommentUpdateSerializer
        return CommentSerializer

    def perform_update(self, serializer):
        comment = self.get_object()
        if comment.user != self.request.user:
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
        serializer.save()

    def perform_destroy(self, instance):
        # soft delete: mark is_deleted true and replace text with placeholder
        user = self.request.user
        if (instance.user != user) and (not user.is_staff):
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
        instance.is_deleted = True
        instance.text = "[deleted]"
        instance.save()
        return instance
    
    