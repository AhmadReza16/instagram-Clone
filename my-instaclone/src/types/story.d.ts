export interface Story {
  id: number;
  media: string;
  user: {
    username: string;
    avatar: string;
  };
  is_seen: boolean;
  reactions_count: number;
}
