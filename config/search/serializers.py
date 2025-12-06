
from rest_framework import serializers
from users.models import User
from posts.models import Post
from posts.serializers import PostSerializer

class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'profile_picture']


class PostSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'image', 'caption', 'created_at']