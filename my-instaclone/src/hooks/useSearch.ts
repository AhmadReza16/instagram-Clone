"use client";

import { useEffect, useState } from "react";
import { searchUsers, searchPosts, getAllPosts } from "@/services/search";

export function useSearch(query: string) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      // If no query, fetch all posts for Explore
      setLoading(true);
      setError(null);
      getAllPosts()
        .then((posts) => {
          console.log("Setting all posts:", posts);
          setResults({
            posts: Array.isArray(posts) ? posts : [],
            users: [],
          });
        })
        .catch((err) => {
          console.error("Error fetching all posts:", err);
          setError(err.message || "Failed to load posts");
        })
        .finally(() => setLoading(false));
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Search both users and posts
        const [usersData, postsData] = await Promise.all([
          searchUsers(query),
          searchPosts(query),
        ]);

        console.log("=== SEARCH RESULTS ===");
        console.log("Raw Users Data from API:", usersData);
        console.log("Raw Posts Data from API:", postsData);

        // Ensure we have arrays
        const users = Array.isArray(usersData) ? usersData : usersData?.results || usersData?.data || [];
        const posts = Array.isArray(postsData) ? postsData : postsData?.results || postsData?.data || [];

        console.log("Parsed users count:", users.length);
        console.log("Parsed posts count:", posts.length);
        
        // Log detailed user info for debugging
        if (Array.isArray(users) && users.length > 0) {
          console.log("First user details:", {
            user: users[0],
            keys: Object.keys(users[0]),
            profile_image: users[0].profile_image,
            avatar: users[0].avatar,
            profile_image_type: typeof users[0].profile_image,
            avatar_type: typeof users[0].avatar,
          });
        }

        setResults({
          users: users,
          posts: posts,
        });
      } catch (err: any) {
        console.error("Search error:", err);
        setError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
}
