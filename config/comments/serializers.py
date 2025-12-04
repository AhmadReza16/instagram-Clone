from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Comment
import re

User = get_user_model()

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "profile_image")


class CommentSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            "id", "user", "post", "parent", "text",
            "created_at", "updated_at", "is_deleted", "replies"
        )
        read_only_fields = ("id", "user", "created_at", "updated_at", "is_deleted", "replies")

    def get_replies(self, obj):
        # return only direct replies (one level)
        qs = obj.replies.filter(is_deleted=False).select_related("user")
        return CommentSerializer(qs, many=True, context=self.context).data
        

class CommentCreateSerializer(serializers.ModelSerializer):
    parent = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Comment
        fields = ("post", "parent", "text")

    def validate(self, attrs):
        parent_id = attrs.get("parent")
        if parent_id:
            try:
                parent = Comment.objects.get(pk=parent_id)
            except Comment.DoesNotExist:
                raise serializers.ValidationError({"parent": "Parent comment does not exist."})
            # prevent reply to a reply (only one-level replies allowed)
            if parent.parent is not None:
                raise serializers.ValidationError({"parent": "Cannot reply to a reply."})
            # ensure same post
            post = attrs.get("post")
            if parent.post_id != post.id:
                raise serializers.ValidationError({"parent": "Parent comment belongs to a different post."})
            attrs["parent_obj"] = parent
        return attrs

    def create(self, validated_data):
        request_user = self.context["request"].user
        parent = validated_data.pop("parent_obj", None)
        comment = Comment.objects.create(
            user=request_user,
            post=validated_data["post"],
            parent=parent,
            text=validated_data["text"]
        )
        return comment
    


class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("text",)

    def validate_text(self, value):
        # prevent empty or whitespace-only comments
        if not re.search(r'\S', value):
            raise serializers.ValidationError("Comment text cannot be empty or whitespace.")
        return value
    
    def update(self, instance, validated_data):
        instance.text = validated_data.get("text", instance.text)
        instance.save()
        return instance
    
