import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from posts.models import Post
from rest_framework.test import APIRequestFactory
from posts.views import FeedView, SuggestedPostsView

User = get_user_model()

# Get or create a test user
try:
    user = User.objects.first()
    if not user:
        print("❌ No users found in database")
    else:
        print(f"✅ Found user: {user.username}")
        
        # Test FeedView
        print("\n=== Testing FeedView ===")
        try:
            factory = APIRequestFactory()
            request = factory.get('/api/posts/feed/')
            request.user = user
            view = FeedView.as_view()
            response = view(request)
            print(f"✅ FeedView Status: {response.status_code}")
        except Exception as e:
            print(f"❌ FeedView Error: {e}")
            import traceback
            traceback.print_exc()
        
        # Test SuggestedPostsView
        print("\n=== Testing SuggestedPostsView ===")
        try:
            factory = APIRequestFactory()
            request = factory.get('/api/posts/suggested/')
            request.user = user
            view = SuggestedPostsView.as_view()
            response = view(request)
            print(f"✅ SuggestedPostsView Status: {response.status_code}")
        except Exception as e:
            print(f"❌ SuggestedPostsView Error: {e}")
            import traceback
            traceback.print_exc()
        
except Exception as e:
    print(f"❌ Setup Error: {e}")
    import traceback
    traceback.print_exc()
