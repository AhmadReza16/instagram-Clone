
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/',include('users.urls')),
    path('api/posts/',include('posts.urls') ),
    path('api/notifications/',include('notifications.urls')),
    path('api/follow/', include('follow.urls')),
    path('api/likes/', include('likes.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/messages/', include('messages.urls')),
    path('api/saved/', include('saved.urls')),
    path('api/search/', include('search.urls')),
    path('api/stories/', include('stories.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
