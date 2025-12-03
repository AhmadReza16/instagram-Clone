from django.urls import path
from .views import ToggleLikeView, PostLikesListView, UserLikedPostsView, IsLikedView

urlpatterns = [
    path('toggle/', ToggleLikeView.as_view(), name='like-toggle'),
    path('posts/<int:post_id>/likes/', PostLikesListView.as_view(), name='post-likes'),
    path('users/<int:user_id>/liked-posts/', UserLikedPostsView.as_view(), name='user-liked-posts'),
    path('is-liked/<int:post_id>/', IsLikedView.as_view(), name='is-liked'),
]
