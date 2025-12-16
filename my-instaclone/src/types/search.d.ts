export interface SearchUser {
  id: number;
  username: string;
  avatar: string;
}

export interface SearchPost {
  id: number;
  image: string;
}

export interface SearchTag {
  name: string;
  posts_count: number;
}
