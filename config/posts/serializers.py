from rest_framework import serializers
from .models import Post, PostImage, Comment, SavedPost, Hashtag
from django.db import transaction


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ('id', 'image', 'order')


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ('id', 'name')


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'text', 'created_at')



class SavedPostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SavedPost
        fields = ('id', 'user', 'post', 'created_at')



class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    saved_count = serializers.IntegerField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    hashtags = HashtagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id', 'user', 'caption', 'location', 'hashtags',
            'images', 'likes_count', 'comments_count', 'saved_count',
            'comments', 'created_at', 'updated_at'
        )


class PostCreateSerializer(serializers.ModelSerializer):
    # برای ایجاد پست اجازه می‌دهیم فایل‌های تصویر به صورت لیست ارسال شوند
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    hashtags = serializers.ListField(
        child=serializers.CharField(max_length=100),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = ('caption', 'location', 'images', 'hashtags')

    def _get_or_create_hashtags(self, names):
        hashtags = []
        for name in names:
            name = name.strip().lstrip('#')
            if not name:
                continue
            obj, _ = Hashtag.objects.get_or_create(name=name)
            hashtags.append(obj)
        return hashtags

    @transaction.atomic
    def create(self, validated_data):
        images = validated_data.pop('images', [])
        hashtag_names = validated_data.pop('hashtags', [])
        user = self.context['request'].user
        post = Post.objects.create(user=user, **validated_data)

        # create images
        for idx, img in enumerate(images):
            PostImage.objects.create(post=post, image=img, order=idx)

        # hashtags
        if hashtag_names:
            tags = self._get_or_create_hashtags(hashtag_names)
            post.hashtags.set(tags)

        return post