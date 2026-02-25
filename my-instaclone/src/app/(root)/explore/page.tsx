"use client";

import { useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchTabs } from "@/components/search/SearchTabs";
import { useSearch } from "@/hooks/useSearch";
import { SearchUsers } from "@/components/search/SearchUsers";
import { SearchPosts } from "@/components/search/SearchPosts";
import { SearchTags } from "@/components/search/SearchTags";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const { results, loading, error } = useSearch(query);

  console.log("Explore - Current query:", query);
  console.log("Explore - Results:", results);
  console.log("Explore - Loading:", loading);
  console.log("Explore - Error:", error);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">Explore</h1>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search users, posts..."
          />
        </div>

        {/* Error State */}
        {error && (
          <ErrorState
            title="Search failed"
            description={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-900 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {/* No Search - Show All Posts */}
        {!query.trim() && results && !loading && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Explore Posts
              </h2>
              {results.posts && results.posts.length > 0 ? (
                <SearchPosts posts={results.posts} />
              ) : (
                <EmptyState
                  title="No posts yet"
                  description="Be the first to share something!"
                />
              )}
            </div>
          </div>
        )}

        {/* Search Results - Show Users First, Then Posts */}
        {query.trim() && results && !loading && (
          <div className="space-y-8">
            {/* Search Tabs */}
            <SearchTabs active={tab} onChange={setTab} />

            {/* Users Section - Always First */}
            {(tab === "all" || tab === "users") && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Users</h2>
                {results.users && results.users.length > 0 ? (
                  <SearchUsers users={results.users} />
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No users found
                  </p>
                )}
              </div>
            )}

            {/* Posts Section */}
            {(tab === "all" || tab === "posts") && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Posts</h2>
                {results.posts && results.posts.length > 0 ? (
                  <SearchPosts posts={results.posts} />
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No posts found
                  </p>
                )}
              </div>
            )}

            {/* Tags Section */}
            {(tab === "all" || tab === "tags") && results.hashtags && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
                {results.hashtags.length > 0 ? (
                  <SearchTags tags={results.hashtags} />
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No tags found
                  </p>
                )}
              </div>
            )}

            {/* No Results At All */}
            {!results.users?.length &&
              !results.posts?.length &&
              !results.hashtags?.length && (
                <EmptyState
                  title="No results found"
                  description={`No users, posts, or tags matching "${query}"`}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
}
