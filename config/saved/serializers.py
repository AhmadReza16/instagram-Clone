from rest_framework import serializers
from .models import SavedPost
from posts.serializers import PostSerializer

class SavedPostSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)

    class Meta:
        model = SavedPost
        fields = ['id', 'post', 'created_at']