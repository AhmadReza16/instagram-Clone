from django.urls import path
from .views import (
    CreateStoryView, StoryFeedView, UserHighlightsView, ViewStoryAPIView,
    RetrieveStoryAPIView, DeleteStoryAPIView, AddMentionAPIView, AddReactionAPIView,
    CreateHighlightView, AddStoryToHighlightView ,
    RemoveStoryFromHighlightView, MyStoriesView, UserStoriesView
)

urlpatterns = [
    path('create/', CreateStoryView.as_view()),
    path('<int:story_id>/view/', ViewStoryAPIView.as_view()),
    path('<int:story_id>/mention/', AddMentionAPIView.as_view()),
    path('<int:story_id>/react/', AddReactionAPIView.as_view()),

    path('highlight/create/', CreateHighlightView.as_view()),
    path('highlight/<int:highlight_id>/<int:story_id>/add/', AddStoryToHighlightView.as_view()),
    path('highlight/<int:highlight_id>/<int:story_id>/remove/', RemoveStoryFromHighlightView.as_view()),
    # user Highlits
    path('highlights/<str:username>/', UserHighlightsView.as_view(), name='user-highlights'),
    # user stories
    path('user/<str:username>/', UserStoriesView.as_view(), name='user-stories'),
    path('story/<int:story_id>/seen/', ViewStoryAPIView.as_view()),
    path('story/<int:story_id>/delete/', DeleteStoryAPIView.as_view()),
    path('story/<int:story_id>/', RetrieveStoryAPIView.as_view()),
    # feed
    path('feed/', StoryFeedView.as_view()),
    path('my-stories/', MyStoriesView.as_view()),
]