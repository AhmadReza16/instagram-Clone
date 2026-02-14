from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'full_name', 'bio', 'profile_image', 'created_at')
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'bio', 'profile_image', 'created_at')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # می‌توان claim های دلخواه اضافه کرد
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'user': UserSerializer(self.user).data
        })
        return data


# سایر سریالایزرها برای پروفایل کاربر، دنبال‌کنندگان و ... باید اضافه شوند.

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id',
            'username',
            'email',
            'bio',
            'website',
            'avatar',
            'created_at',
        )
        read_only_fields = ('id', 'username', 'email', 'created_at')


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'bio', 'profile_image')

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.bio = validated_data.get('bio', instance.bio)
        
        # Handle profile_image if provided
        if 'profile_image' in validated_data:
            instance.profile_image = validated_data.get('profile_image')
        
        instance.save()
        return instance
        

class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image')
        read_only_fields = ('id', 'username', 'profile_image')
        
class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image')
        read_only_fields = ('id', 'username', 'profile_image')

class IsFollowingSerializer(serializers.Serializer):
    is_following = serializers.BooleanField()

class CountSerializer(serializers.Serializer):
    count = serializers.IntegerField()

class PostsCountSerializer(serializers.Serializer):
    posts_count = serializers.IntegerField()

class UserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    posts_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    avatar = serializers.CharField(source='profile_image', read_only=True)
    posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'full_name', 'bio', 'avatar', 'profile_image', 'email', 'followers_count', 'following_count', 'posts_count', 'is_following', 'posts', 'created_at')
        read_only_fields = ('id', 'username', 'email', 'created_at')

    def get_followers_count(self, obj):
        return obj.followers_set.count() if hasattr(obj, 'followers_set') else 0

    def get_following_count(self, obj):
        return obj.following_set.count() if hasattr(obj, 'following_set') else 0

    def get_posts_count(self, obj):
        return obj.posts.count() if hasattr(obj, 'posts') else 0

    def get_posts(self, obj):
        """Return user's posts"""
        from posts.serializers import PostSerializer
        posts = obj.posts.all()
        return PostSerializer(posts, many=True, context=self.context).data

    def get_is_following(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        # Check if current user follows this user
        try:
            from follow.models import Follow
            return Follow.objects.filter(follower=request.user, following=obj).exists()
        except:
            return False
        if request and request.user.is_authenticated:
            return request.user.following.filter(id=obj.id).exists()
        return False
