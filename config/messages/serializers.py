from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["id", "sender", "created_at", "conversation"]


class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    participants = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Conversation
        fields = ["id", "participants", "updated_at", "created_at", "last_message", "unread_count"]

    def get_last_message(self, obj):
        last_msg = obj.messages.order_by("-created_at").first()
        return MessageSerializer(last_msg).data if last_msg else None
    
    def get_unread_count(self, obj):
        user = self.context['request'].user
        return obj.unread_count_for(user)