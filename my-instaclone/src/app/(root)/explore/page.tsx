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

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">Explore</h1>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        {/* No Search Yet */}
        {!query.trim() && !results && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Search for people, posts, or tags
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorState
            title="Search failed"
            description="Unable to perform search. Please try again."
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-900 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Search Tabs */}
        {results && !loading && (
          <>
            <SearchTabs active={tab} onChange={setTab} />

            {/* Results */}
            <div className="mt-6 space-y-6">
              {(tab === "all" || tab === "users") && results.users && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Users
                  </h2>
                  {results.users.length > 0 ? (
                    <SearchUsers users={results.users} />
                  ) : (
                    <p className="text-gray-400">No users found</p>
                  )}
                </div>
              )}

              {(tab === "all" || tab === "posts") && results.posts && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Posts
                  </h2>
                  {results.posts.length > 0 ? (
                    <SearchPosts posts={results.posts} />
                  ) : (
                    <p className="text-gray-400">No posts found</p>
                  )}
                </div>
              )}

              {(tab === "all" || tab === "tags") && results.hashtags && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Tags
                  </h2>
                  {results.hashtags.length > 0 ? (
                    <SearchTags tags={results.hashtags} />
                  ) : (
                    <p className="text-gray-400">No tags found</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* No Results */}
        {results &&
          !loading &&
          !results.users?.length &&
          !results.posts?.length &&
          !results.hashtags?.length && (
            <EmptyState
              title="No results found"
              description="Try searching for something else"
            />
          )}
      </div>
    </div>
  );
}
