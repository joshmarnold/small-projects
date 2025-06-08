import { DMThread } from "./dm";

export interface Message {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface MessageSlice {
  directMessages: DMThread[];
  sendDirectMessage: (otherUserId: string, text: string) => void;
}
