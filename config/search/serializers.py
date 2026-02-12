
from rest_framework import serializers
from users.models import User , Profile
from posts.models import Post
from posts.serializers import PostSerializer

class UserSearchSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(source='profile.avatar', read_only=True)
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'profile_picture']
        
    def get_full_name(self, obj):
        return obj.username

class PostSearchSerializer(serializers.ModelSerializer):
    PostSearch = PostSerializer
    class Meta:
        model = Post
        fields = ['id', 'image', 'caption', 'created_at']