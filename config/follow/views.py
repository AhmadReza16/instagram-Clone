from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Exists, OuterRef



from .models import Follow
from .serializers import FollowSerializer, SimpleUserSerializer
from django.contrib.auth import get_user_model
from . import models


User = get_user_model()


class FollowToggleView(generics.GenericAPIView):
    """
    Toggle follow/unfollow.
    Request body: {"following_id": <user_id>}
    If follow exists -> unfollow (deleted) -> return {"following": False}
    Else -> create follow -> return {"following": True}
    """
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        follower = request.user
        following_id = request.data.get("following_id")
        if following_id is None:
            return Response({"detail": "following_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        if int(following_id) == int(getattr(follower, "id")):
            return Response({"detail": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        following_user = get_object_or_404(User, pk=following_id)

        existing = Follow.objects.filter(follower=follower, following=following_user).first()
        if existing:
            existing.delete()
            return Response({"following": False}, status=status.HTTP_200_OK)
        else:
            follow_obj = Follow.objects.create(follower=follower, following=following_user)
            # signals will handle notifications
            return Response({"following": True, "id": follow_obj.id}, status=status.HTTP_201_CREATED)


class FollowersListView(generics.ListAPIView):
    """
    List followers of a given user.
    URL: /followers/<int:user_id>/
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SimpleUserSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        # users who follow the target user
        return User.objects.filter(id__in=Follow.objects.filter(following_id=user_id).values_list("follower_id", flat=True))


class FollowingListView(generics.ListAPIView):
    """
    List users that the given user is following.
    URL: /following/<int:user_id>/
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SimpleUserSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return User.objects.filter(id__in=Follow.objects.filter(follower_id=user_id).values_list("following_id", flat=True))


class IsFollowingView(generics.GenericAPIView):
    """
    Check whether request.user follows <user_id>
    GET /is-following/<int:user_id>/
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        exists = Follow.objects.filter(follower=request.user, following_id=user_id).exists()
        return Response({"is_following": exists})
        

class SuggestionsView(generics.ListAPIView):
    """
    Simple follow suggestions:
    - users that request.user does not follow and is not self
    - prioritise users followed by the people the request user follows (mutuals)
    This is a basic approach; can be extended with more advanced algorithms.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SimpleUserSerializer

    def get_queryset(self):
        user = self.request.user
        # users already followed or self
        excluded = list(Follow.objects.filter(follower=user).values_list("following_id", flat=True))
        excluded.append(user.id)

        # strategy:
        # 1) get users followed by people user follows (mutuals)
        mutuals = User.objects.filter(
            id__in=Follow.objects.filter(
                follower_id__in=Follow.objects.filter(follower=user).values_list("following_id", flat=True)
            ).values_list("following_id", flat=True)
        ).exclude(id__in=excluded).distinct()

        if mutuals.exists():
            return mutuals[:20]

        # fallback: most-followed users excluding excluded
        return User.objects.exclude(id__in=excluded).annotate(
            num_followers=models.Count('followers_set')
        ).order_by('-num_followers')[:20]
        
