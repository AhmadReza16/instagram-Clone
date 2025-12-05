from rest_framework import generics, permissions , status
from rest_framework.response import Response
from django.db.models import Q

from follow import models
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
from django.utils import timezone


class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(participants=self.request.user).order_by("-updated_at")


class CreateConversationView(generics.CreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        conversation = serializer.save()
        conversation.participants.add(self.request.user)
        other_id = self.request.data.get("other_user")
        conversation.participants.add(other_id)


class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        conv_id = self.kwargs["conversation_id"]
        qs = Message.objects.filter(
            conversation_id=conv_id,
            is_deleted=False
        ).order_by("created_at")

        # mark all as read
        qs.exclude(sender=self.request.user).update(is_read=True)
        return qs



class SendMessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        conv_id = self.kwargs["conversation_id"]

        # Check if user is participant
        conv = Conversation.objects.get(id=conv_id)

        if self.request.user not in conv.participants.all():
            raise PermissionError("You are not in this conversation.")

        serializer.save(sender=self.request.user, conversation_id=conv_id)

        # update conversation timestamp
        conv.updated_at = timezone.now()
        conv.save()

class DeleteMessageView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Message.objects.all()

    def perform_destroy(self, instance):
        if instance.sender != self.request.user:
            raise PermissionError("You can delete only your own messages.")

        instance.is_deleted = True
        instance.save()

        
