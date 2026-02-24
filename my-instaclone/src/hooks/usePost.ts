'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/api';
import { getPostById } from '@/services/posts';

interface UsePostResult {
  post: Post | null;
  loading: boolean;
  error: string | null;
}

export function usePost(id: string | number): UsePostResult {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Post ID is required');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostById(String(id));
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
}
