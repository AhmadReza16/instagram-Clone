from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from users.models import User
from posts.models import Post
from .serializers import UserSearchSerializer, PostSearchSerializer


class SearchUsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q', '').strip()
        print(f"\n=== SearchUsersView START ===")
        print(f"Query: '{query}'")

        if not query:
            print("Empty query, returning empty results")
            print("=== SearchUsersView END ===\n")
            return Response([])

        try:
            users = User.objects.filter(
                username__icontains=query
            ) | User.objects.filter(
                full_name__icontains=query
            )
            
            users = users.distinct()
            print(f"Found {users.count()} users matching '{query}'")
            
            # Log each user's profile info BEFORE serialization
            for user in users:
                try:
                    has_profile = hasattr(user, 'profile') and user.profile is not None
                    avatar_path = None
                    if has_profile:
                        avatar = getattr(user.profile, 'avatar', None)
                        avatar_path = str(avatar) if avatar else None
                    print(f"  - {user.username}: has_profile={has_profile}, avatar={avatar_path}")
                except Exception as e:
                    print(f"  - {user.username}: ERROR - {e}")
            
            serializer = UserSearchSerializer(
                users, 
                many=True,
                context={'request': request}  # Pass request context for is_following
            )
            
            print(f"\nSerialized data count: {len(serializer.data)}")
            if serializer.data:
                first_user = serializer.data[0]
                print(f"First user serialized:")
                print(f"  - username: {first_user.get('username')}")
                print(f"  - profile_image: {first_user.get('profile_image')} (type: {type(first_user.get('profile_image'))})")
                print(f"  - avatar: {first_user.get('avatar')} (type: {type(first_user.get('avatar'))})")
            print(f"=== SearchUsersView END ===\n")
            
            return Response(serializer.data)
        except Exception as e:
            print(f"SearchUsersView Error: {e}")
            import traceback
            traceback.print_exc()
            print(f"=== SearchUsersView END (ERROR) ===\n")
            return Response({"error": str(e)}, status=400)


class SearchPostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q', '').strip()
        print(f"SearchPostsView: Query = '{query}'")

        if not query:
            print("SearchPostsView: Empty query, returning empty results")
            return Response([])

        try:
            posts = Post.objects.filter(
                caption__icontains=query
            ).select_related('user').prefetch_related('images')
            
            print(f"SearchPostsView: Found {posts.count()} posts")
            
            serializer = PostSearchSerializer(posts, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"SearchPostsView Error: {e}")
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=400)