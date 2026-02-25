
from rest_framework import serializers
from users.models import User , Profile
from posts.models import Post
from posts.serializers import PostSerializer

class UserSearchSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_image', 'avatar', 'is_following']
    
    def get_profile_image(self, obj):
        try:
            username = obj.username
            if hasattr(obj, 'profile') and obj.profile and getattr(obj.profile, 'avatar', None):
                avatar = obj.profile.avatar
                # Return the URL if it's a FileField, otherwise return the path string
                if hasattr(avatar, 'url'):
                    result = avatar.url
                    print(f"  get_profile_image({username}): returned avatar.url = '{result}'")
                    return result
                else:
                    result = str(avatar) if avatar else None
                    print(f"  get_profile_image({username}): returned str(avatar) = '{result}'")
                    return result
            print(f"  get_profile_image({username}): no profile or no avatar, returning None")
            return None
        except Exception as e:
            print(f"  get_profile_image({obj.username}): ERROR - {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def get_avatar(self, obj):
        try:
            username = obj.username
            if hasattr(obj, 'profile') and obj.profile and getattr(obj.profile, 'avatar', None):
                avatar = obj.profile.avatar
                if hasattr(avatar, 'url'):
                    result = avatar.url
                    print(f"  get_avatar({username}): returned avatar.url = '{result}'")
                    return result
                else:
                    result = str(avatar) if avatar else None
                    print(f"  get_avatar({username}): returned str(avatar) = '{result}'")
                    return result
            print(f"  get_avatar({username}): no profile or no avatar, returning None")
            return None
        except Exception as e:
            print(f"  get_avatar({obj.username}): ERROR - {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def get_is_following(self, obj):
        try:
            request = self.context.get('request')
            if request and request.user.is_authenticated:
                from follow.models import Follow
                return Follow.objects.filter(follower=request.user, following=obj).exists()
            return False
        except Exception as e:
            print(f"Error getting is_following for {obj.username}: {e}")
            return False

class PostSearchSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'image', 'caption', 'created_at', 'user']
    
    def get_image(self, obj):
        # Get first image from the post
        if obj.image:
            return obj.image.url if hasattr(obj.image, 'url') else str(obj.image)
        # Fallback to first related image
        images = obj.images.all()
        if images.exists():
            first_image = images.first()
            return first_image.image.url if hasattr(first_image.image, 'url') else str(first_image.image)
        return None
    
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
        }