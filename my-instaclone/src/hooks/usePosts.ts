'use client';

// =====================================
//  (Feed support)
// =====================================

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedPosts } from '@/services/posts';
import { Post } from '@/types/api';

interface UsePostsOptions {
  type?: 'feed' | 'profile' | 'saved';
  username?: string;
}

export function usePosts(options: UsePostsOptions = { type: 'feed' }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', options],
    queryFn: ({ pageParam = 1 }) =>
      getFeedPosts({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    enabled: options.type === 'feed',
  });

  const posts: Post[] = data?.pages.flatMap((page) => page.results) ?? [];

  return {
    posts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}