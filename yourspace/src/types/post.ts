import { Message } from "./message";

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: string[];
  comments: Message[];
}

export interface PostSlice {
  posts: Post[];
  addPost: (content: string, imageUrl?: string) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, text: string) => void;
}
