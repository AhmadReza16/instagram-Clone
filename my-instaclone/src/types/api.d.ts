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
