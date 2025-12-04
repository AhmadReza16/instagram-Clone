from django.urls import path
from .views import PostCommentsListCreateView, CommentDetailView

urlpatterns = [
    path('posts/<int:post_id>/', PostCommentsListCreateView.as_view(), name='post-comments'),
    path('<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]