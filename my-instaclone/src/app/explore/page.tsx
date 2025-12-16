"use client";

import { useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchTabs } from "@/components/search/SearchTabs";
import { useSearch } from "@/hooks/useSearch";
import { SearchUsers } from "@/components/search/SearchUsers";
import { SearchPosts } from "@/components/search/SearchPosts";
import { SearchTags } from "@/components/search/SearchTags";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const { results, loading } = useSearch(query);

  return (
    <div className="max-w-xl mx-auto px-4">
      <SearchInput value={query} onChange={setQuery} />
      <SearchTabs active={tab} onChange={setTab} />

      {loading && <p className="mt-4">Searching...</p>}

      {!results && !loading && (
        <p className="mt-6 text-gray-500">Try searching</p>
      )}

      {results && (
        <>
          {(tab === "all" || tab === "users") && (
            <SearchUsers users={results.users} />
          )}

          {(tab === "all" || tab === "posts") && (
            <SearchPosts posts={results.posts} />
          )}

          {(tab === "all" || tab === "tags") && (
            <SearchTags tags={results.hashtags} />
          )}
        </>
      )}
    </div>
  );
}
