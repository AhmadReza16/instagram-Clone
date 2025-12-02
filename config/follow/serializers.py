from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Follow

User = get_user_model()


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "full_name", "profile_image")


class FollowSerializer(serializers.ModelSerializer):
    follower = SimpleUserSerializer(read_only=True)
    following = SimpleUserSerializer(read_only=True)
    following_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = Follow
        fields = ("id", "follower", "following", "following_id", "created_at")
        read_only_fields = ("id", "follower", "following", "created_at")

    def validate_following_id(self, value):
        request_user = self.context["request"].user
        if value == getattr(request_user, "id"):
            raise serializers.ValidationError("You cannot follow yourself.")
        try:
            User.objects.get(pk=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")
        return value

    def create(self, validated_data):
        follower = self.context["request"].user
        following_id = validated_data.pop("following_id")
        following = User.objects.get(pk=following_id)
        follow_obj, created = Follow.objects.get_or_create(follower=follower, following=following)
        return follow_obj

