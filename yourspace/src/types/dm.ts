import { Message } from "./message";

export interface DMThread {
  userIds: [string, string];
  messages: Message[];
}
