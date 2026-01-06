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
  const res = await apiClient.get(`posts/${id}/`);
  return res.data;
}

export async function getFeedPosts() {
  const res = await apiClient.get("posts/feed/");
  if (!res.ok) {
    throw new Error("Failed to fetch feed posts");
  }
  return res.data;;
}

export async function getFeedPosts(
params: GetFeedPostsParams = {}
): Promise<FeedPostsResponse> {
const page = params.page ?? 1;

const response = await apiClient.get("posts/feed/", {
params: { page },
});
if (!response.ok) {
throw new Error("Failed to fetch feed posts");
}


return {
results: response.data.results,
nextPage: response.data.next ? page + 1 : null,
};
}

export async function getCommentsByPost(id: string) {
  const res = await apiClient.get(`posts/${id}/comments/`);
  return res.data;
}

export async function addComment(
  postId: string,
  content: string
) {
  const res = await apiClient.post(
    `/posts/${postId}/comments/`,
    { content }
  );

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  return res.data;
}

export async function getSavedPosts() {
  const res = await apiClient.get("saved/save/");

  if (!res.ok) {
    throw new Error("Failed to fetch saved posts");
  }
  return res.data;
}
