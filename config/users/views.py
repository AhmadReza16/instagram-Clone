from rest_framework import generics
from .models import User
from django.contrib.auth import get_user_model

from .serializers import (
    CountSerializer,RegisterSerializer,UserSerializer,
    MyTokenObtainPairSerializer ,ProfileSerializer,UpdateProfileSerializer,
    FollowerSerializer, FollowingSerializer, IsFollowingSerializer, PostsCountSerializer 
    ,UserProfileSerializer)

from .models import Profile
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


class CurrentUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """
        برای لغو Refresh token (logout سروری) باید body شامل {'refresh': '<refresh_token>'} باشد.
        نیاز به app token_blacklist در INSTALLED_APPS دارد.
        """
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"detail": "Refresh token required."}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

# سایر ویوها برای پروفایل کاربر، دنبال کردن و ... بعدا اضافه شوند.
class CurrentProfileUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        username = self.kwargs['username']
        return generics.get_object_or_404(User, username=username)
    
    def put(self, request, *args, **kwargs):
        if request.user.username != self.kwargs['username']:
            return Response({"detail": "You do not have permission to update this profile."}, status=status.HTTP_403_FORBIDDEN)
        return self.update(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):   
        user_to_follow = self.get_object()
        if request.user == user_to_follow:
            return Response({"detail": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)
        request.user.following.add(user_to_follow)
        return Response({"detail": f"You are now following {user_to_follow.username}."}, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        user_to_unfollow = self.get_object()
        if request.user == user_to_unfollow:
            return Response({"detail": "You cannot unfollow yourself."}, status=status.HTTP_400_BAD_REQUEST)
        request.user.following.remove(user_to_unfollow)
        return Response({"detail": f"You have unfollowed {user_to_unfollow.username}."}, status=status.HTTP_200_OK)
    def get_followers(self, request, *args, **kwargs):
        user = self.get_object()
        followers = user.followers.all()
        serializer = FollowerSerializer(followers, many=True)
        return Response(serializer.data)    
    def get_following(self, request, *args, **kwargs):
        user = self.get_object()
        following = user.following.all()
        serializer = FollowingSerializer(following, many=True)
        return Response(serializer.data)
    def get_is_following(self, request, *args, **kwargs):
        user = self.get_object()
        is_following = request.user.following.filter(id=user.id).exists()
        serializer = IsFollowingSerializer({'is_following': is_following})
        return Response(serializer.data)
    def get_followers_count(self, request, *args, **kwargs):    
        user = self.get_object()
        followers_count = user.followers.count()
        serializer = CountSerializer({'count': followers_count})
        return Response(serializer.data)
    def get_following_count(self, request, *args, **kwargs):
        user = self.get_object()
        following_count = user.following.count()
        serializer = CountSerializer({'count': following_count})
        return Response(serializer.data)
    def get_posts_count(self, request, *args, **kwargs):
        user = self.get_object()
        posts_count = user.posts.count()
        serializer = PostsCountSerializer({'posts_count': posts_count})
        return Response(serializer.data)
    
class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        username = self.kwargs['username']
        return generics.get_object_or_404(User, username=username)

    def put(self, request, *args, **kwargs):
        if request.user.username != self.kwargs['username']:
            return Response({"detail": "You do not have permission to update this profile."}, status=status.HTTP_403_FORBIDDEN)
        return self.update(request, *args, **kwargs)
    

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile

    def patch(self, request, *args, **kwargs):
        self.serializer_class = UpdateProfileSerializer
        return super().patch(request, *args, **kwargs)
    
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny,)

    def get_object(self):
        username = self.kwargs['username']
        user = generics.get_object_or_404(User, username=username)
        profile, _ = Profile.objects.get_or_create(user=user)
        return profile