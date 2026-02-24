from django.urls import path
from .views import (
    FollowToggleView, FollowersListView, FollowingListView,
    IsFollowingView, SuggestionsView, FollowView, UnfollowView
)

urlpatterns = [
    path('toggle/', FollowToggleView.as_view(), name='follow-toggle'),
    path('follow/', FollowView.as_view(), name='follow'),
    path('unfollow/', UnfollowView.as_view(), name='unfollow'),
    path('followers/<int:user_id>/', FollowersListView.as_view(), name='followers-list'),
    path('following/<int:user_id>/', FollowingListView.as_view(), name='following-list'),
    path('is-following/<int:user_id>/', IsFollowingView.as_view(), name='is-following'),
    path('suggestions/', SuggestionsView.as_view(), name='follow-suggestions'),
]