from django.urls import path
from .views import SearchUsersView, SearchPostsView

urlpatterns = [
    path('users/', SearchUsersView.as_view(), name='search-users'),
    path('posts/', SearchPostsView.as_view(), name='search-posts'),
]