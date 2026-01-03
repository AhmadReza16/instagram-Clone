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

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'bio', 'profile_image')
        read_only_fields = ('id', 'username')

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('bio', 'profile_image')
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

