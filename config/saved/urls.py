from django.urls import path
from .views import SavePostView, UnsavePostView, SavedListView

urlpatterns = [
    path('save/<int:post_id>/', SavePostView.as_view(), name='save-post'),
    path('unsave/<int:post_id>/', UnsavePostView.as_view(), name='unsave-post'),
    path('list/', SavedListView.as_view(), name='saved-posts-list'),
]