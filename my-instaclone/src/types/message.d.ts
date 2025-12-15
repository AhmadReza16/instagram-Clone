export interface Thread {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  last_message: string;
  unread_count: number;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  created_at: string;
}
