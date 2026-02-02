export interface CreateStoryPayload {
  title: string;
  content: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
  };
  created_at: string;
}

export interface PostImage {
  id: number;
  image: string;
  order: number;
}

export interface PostLike {
  id: number;
  user: {
    id: number;
    username: string;
  };
  created_at: string;
}

export interface PostComment {
  id: number;
  user: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  content: string;
  created_at: string;
}

export interface Post {
  id: number;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  caption?: string;
  image?: string;
  images?: PostImage[];
  hashtags?: Array<{
    id: number;
    name: string;
  }>;
  likes?: PostLike[];
  comments?: PostComment[];
  likes_count?: number;
  comments_count?: number;
  saved_count?: number;
  created_at: string;
  updated_at?: string;
}
