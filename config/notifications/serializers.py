from rest_framework import serializers
from .models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    recipient = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = (
            "id", "sender", "recipient", "notification_type",
            "message", "post_id", "comment_id", "data",
            "is_read", "created_at"
        )

    def get_sender(self, obj):
        if obj.sender is None:
            return None
        # return minimal public info about the actor
        return {"id": obj.sender.id, "username": getattr(obj.sender, "username", None)}
