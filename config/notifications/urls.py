from django.urls import path
from .views import (
    NotificationListView, UnreadCountView,
    MarkAllReadView, MarkSingleReadView, DeleteNotificationView
)

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications-list'),
    path('unread-count/', UnreadCountView.as_view(), name='notifications-unread-count'),
    path('mark-read/', MarkAllReadView.as_view(), name='notifications-mark-all-read'),
    path('<int:pk>/mark-read/', MarkSingleReadView.as_view(), name='notifications-mark-single-read'),
    path('<int:pk>/', DeleteNotificationView.as_view(), name='notifications-delete'),
]
