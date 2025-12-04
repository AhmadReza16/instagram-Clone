from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'parent', 'created_at', 'is_deleted')
    search_fields = ('user__username', 'text', 'post__id')
    readonly_fields = ('created_at', 'updated_at')