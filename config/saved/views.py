from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import SavedPost
from .serializers import SavedPostSerializer
from posts.models import Post


class SavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = Post.objects.get(id=post_id)
        saved, created = SavedPost.objects.get_or_create(user=request.user, post=post)

        if not created:
            return Response({'detail': 'Post already saved.'}, status=400)

        return Response({'detail': 'Post saved successfully.'}, status=201)


class UnsavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        try:
            saved = SavedPost.objects.get(user=request.user, post_id=post_id)
            saved.delete()
            return Response({'detail': 'Post unsaved.'}, status=200)
        except SavedPost.DoesNotExist:
            return Response({'detail': 'Post is not saved.'}, status=404)


class SavedListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        saved_posts = SavedPost.objects.filter(user=request.user).order_by('-created_at')
        serializer = SavedPostSerializer(saved_posts, many=True)
        return Response(serializer.data)
