"use client";

// import { useEffect, useState } from "react";
// import { getStoryById } from "@/services/stories";
// import { Story } from "@/types/api";

// export function useStories() {
//   const [stories, setStories] = useState<Story[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getStoryById()
//       .then(setStories)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   return { stories, loading, error };
// }

import { useQuery } from '@tanstack/react-query';
import { getFeedStories } from '@/services/stories';


interface UseStoriesOptions {
  type?: 'feed' | 'profile';
  username?: string;
}

export function useStories(options: UseStoriesOptions = { type: 'feed' }) {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stories', options],
    queryFn: getFeedStories,
    enabled: options.type === 'feed',
    staleTime: 1000 * 60,
  });

  return {
    stories: data ?? [],
    isLoading,
    isError,
  };
}
