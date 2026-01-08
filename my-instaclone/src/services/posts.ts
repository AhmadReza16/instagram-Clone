import { apiClient } from "@/lib/api-client";
import { Post } from '@/types/api';

interface FeedPostsResponse {
  results: Post[];
  nextPage: number | null;
}

interface GetFeedPostsParams {
  page?: number;
}

export async function getPostById(id: string) {
  try {
    const res = await apiClient.get(`posts/${id}/`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getFeedPosts(
  params: GetFeedPostsParams = {}
): Promise<FeedPostsResponse> {
  try {
    const page = params.page ?? 1;

    const response = await apiClient.get("posts/feed/", {
      params: { page },
    });

    return {
      results: response.data.results,
      nextPage: response.data.next ? page + 1 : null,
    };
  } catch (error) {
    throw error;
  }
}

export async function getCommentsByPost(id: string) {
  try {
    const res = await apiClient.get(`posts/${id}/comments/`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addComment(
  postId: string,
  content: string
) {
  try {
    const res = await apiClient.post(
      `posts/${postId}/comments/`,
      { content }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSavedPosts() {
  try {
    const res = await apiClient.get("saved/save/");
    return res.data;
  } catch (error) {
    throw error;
  }
}
