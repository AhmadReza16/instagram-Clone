import { apiClient } from "@/lib/api-client";
import { Post } from '@/types/api';

interface FeedPostsResponse {
  results: Post[];
  nextPage: number | null;
}

interface GetFeedPostsParams {
  page?: number;
}

export async function createPost(formData: FormData) {
  try {
    const res = await apiClient.post(`posts/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
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

export async function getSuggestedPosts(
  params: GetFeedPostsParams = {}
): Promise<FeedPostsResponse> {
  try {
    const page = params.page ?? 1;

    const response = await apiClient.get("posts/suggested/", {
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
export async function getExplorePosts(
  params: GetFeedPostsParams = {}
): Promise<FeedPostsResponse> {

  const page = params.page ?? 1;
  const response = await apiClient.get("posts/explore/", { params: { page } });
  return { 
      results: response.data.results,
      nextPage: response.data.next ? page + 1 : null };

}