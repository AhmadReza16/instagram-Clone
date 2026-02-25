/**
 * Debug helper for Explore page
 * Run these functions in the browser console to test data flow
 */

export function debugSearchUsers() {
  console.group("🔍 Search Users Debug");
  
  // Check if we have users
  const users = (window as any).__searchUsers;
  console.log("Users from state:", users);
  
  if (users && Array.isArray(users)) {
    console.log(`✅ Found ${users.length} users`);
    users.forEach((user: any) => {
      console.log(`  - ${user.username}:`, {
        profile_image: user.profile_image,
        avatar: user.avatar,
        is_following: user.is_following,
      });
    });
  } else {
    console.warn("❌ Users not found or not an array");
  }
  
  console.groupEnd();
}

export function debugProfileImages() {
  console.group("🖼️ Profile Images Debug");
  
  const users = (window as any).__searchUsers;
  if (!users || !Array.isArray(users)) {
    console.warn("❌ No users found");
    return;
  }
  
  users.forEach((user: any) => {
    const imagePath = user.profile_image || user.avatar;
    console.log(`📸 ${user.username}:`, {
      path: imagePath,
      full_url: imagePath ? `${process.env.NEXT_PUBLIC_API_URL}${imagePath}` : "N/A",
      status: imagePath ? "✅" : "❌",
    });
  });
  
  console.groupEnd();
}

export function debugFollowState() {
  console.group("👥 Follow State Debug");
  
  const followState = (window as any).__followingMap;
  console.log("Follow state:", followState);
  
  if (followState) {
    Object.entries(followState).forEach(([userId, isFollowing]: any) => {
      console.log(`  User ${userId}: ${isFollowing ? "Following ✅" : "Not Following ❌"}`);
    });
  }
  
  console.groupEnd();
}

export function debugMessages() {
  console.group("💬 Messages Navigation Debug");
  
  const users = (window as any).__searchUsers;
  if (!users || !Array.isArray(users)) {
    console.warn("❌ No users found");
    return;
  }
  
  console.log("Message link examples:");
  users.slice(0, 3).forEach((user: any) => {
    const link = `/messages?user=${user.username}`;
    console.log(`  📧 ${user.username}: ${link}`);
  });
  
  console.groupEnd();
}

// Attach to window for easy access in console
if (typeof window !== "undefined") {
  (window as any).debugExplore = {
    users: debugSearchUsers,
    images: debugProfileImages,
    follow: debugFollowState,
    messages: debugMessages,
    all: () => {
      debugSearchUsers();
      debugProfileImages();
      debugFollowState();
      debugMessages();
    },
  };
}

export const exploreDeuggingTips = `
=== Explore Page Debug Tips ===

Run in browser console:

1. Check Users:
   debugExplore.users()

2. Check Images:
   debugExplore.images()

3. Check Follow State:
   debugExplore.follow()

4. Check Message Links:
   debugExplore.messages()

5. Run All:
   debugExplore.all()

Expected results:
✅ Users should load from /search/users/ endpoint
✅ Images should have /media/ prefix
✅ Follow state should toggle on button click
✅ Message links should work
`;
