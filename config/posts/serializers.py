from rest_framework import serializers
from .models import Post, PostImage, Hashtag
from django.db import transaction


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ('id', 'image', 'order')


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ('id', 'name')



class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    hashtags = HashtagSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'id', 'user', 'caption',
            'image', 'images', 'hashtags',
            'likes_count', 'comments_count',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def get_likes_count(self, obj):
        return obj.likes.count() if hasattr(obj, 'likes') else 0

    def get_comments_count(self, obj):
        return obj.comments.count() if hasattr(obj, 'comments') else 0


class PostCreateSerializer(serializers.ModelSerializer):
    # برای ایجاد پست اجازه می‌دهیم فایل‌های تصویر به صورت لیست یا تکی ارسال شوند
    image = serializers.ImageField(write_only=True, required=False)
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
        fields = ('caption', 'image', 'images', 'hashtags')
        
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
        # Handle both single image and multiple images
        images = validated_data.pop('images', [])
        single_image = validated_data.pop('image', None)
        hashtag_names = validated_data.pop('hashtags', [])
        user = self.context['request'].user
        
        post = Post.objects.create(user=user, **validated_data)

        # Combine single image with multiple images
        all_images = []
        if single_image:
            all_images.append(single_image)
        all_images.extend(images)

        # create images
        for idx, img in enumerate(all_images):
            PostImage.objects.create(post=post, image=img, order=idx)

        # hashtags
        if hashtag_names:
            tags = self._get_or_create_hashtags(hashtag_names)
            post.hashtags.set(tags)

        return post