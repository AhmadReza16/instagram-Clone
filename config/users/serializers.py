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
        model = Profile
        fields = ('bio', 'website', 'avatar')
        read_only_fields = ('username',)

        def update(self, instance, validated_data):
            instance.bio = validated_data.get('bio', instance.bio)
            instance.profile_image = validated_data.get('profile_image', instance.profile_image)
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

    class Meta:
        model = User
        fields = ('id', 'username', 'bio', 'profile_image', 'followers_count', 'following_count', 'posts_count')
        read_only_fields = ('id', 'username', 'bio', 'profile_image')

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_posts_count(self, obj):
        return obj.posts.count()
