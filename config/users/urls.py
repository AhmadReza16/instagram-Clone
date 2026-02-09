from django.urls import path
from .views import (
    RegisterView,
    CurrentUserView,
    MyTokenObtainPairView,
    LogoutView,
    MyProfileView,
    UpdateProfileView,
    UserProfileView,
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='current_user'),

    path('Update/', UpdateProfileView.as_view(), name='current_user'),
    # profile
    path('profile/', MyProfileView.as_view(), name='user_profile'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='user-profile'),
]