from django.urls import path

from .views import (
    PostListCreateView, PostDetailView,
    FeedView, ExploreView, SuggestedPostsView
)

urlpatterns = [
    path('', PostListCreateView.as_view(), name='posts-list-create'),
    path('<int:pk>/', PostDetailView.as_view(), name='posts-detail'),
    path('feed/', FeedView.as_view(), name='posts-feed'),
    path('explore/', ExploreView.as_view(), name='posts-explore'),
    path('suggested/', SuggestedPostsView.as_view(), name='posts-suggested'),
]