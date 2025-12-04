from rest_framework import serializers
from django.contrib.auth import get_user_model

from posts.models import Post
from .models import Like
from posts.serializers import PostSerializer  # read-only use of post data

User = get_user_model()


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "profile_image")


class LikeSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Like
        fields = ("id", "user", "post", "created_at")
        read_only_fields = ("id", "user", "created_at")
