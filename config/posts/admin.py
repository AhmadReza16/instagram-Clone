from django.contrib import admin
from .models import Post, PostImage, Hashtag

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'caption', 'created_at')
    search_fields = ('user__username', 'caption')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'order')
    readonly_fields = ('id',)


@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

