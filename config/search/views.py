from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from users.models import User
from posts.models import Post
from .serializers import UserSearchSerializer, PostSearchSerializer


class SearchUsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q', '')

        users = User.objects.filter(
            username__icontains=query
        ) | User.objects.filter(
            full_name__icontains=query
        )

        serializer = UserSearchSerializer(users.distinct(), many=True)
        return Response(serializer.data)


class SearchPostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q', '')

        posts = Post.objects.filter(
            caption__icontains=query
        )

        serializer = PostSearchSerializer(posts, many=True)
        return Response(serializer.data)