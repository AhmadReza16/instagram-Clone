from django.urls import path
from .views import (
    ConversationListView,
    CreateConversationView,
    MessageListView,
    SendMessageView,
    DeleteMessageView
)

urlpatterns = [
    path("conversations/", ConversationListView.as_view(), name="conversation-list"),
    path("conversations/create/", CreateConversationView.as_view(), name="conversation-create"),
    path("conversations/<int:conversation_id>/messages/", MessageListView.as_view(), name="message-list"),
    path("conversations/<int:conversation_id>/messages/send/", SendMessageView.as_view(), name="message-send"),
    path("messages/<int:pk>/delete/", DeleteMessageView.as_view(), name="message-delete"),
]
