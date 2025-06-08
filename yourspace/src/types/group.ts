import { Message } from "./message";

export interface Group {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberIds: string[];
  messages: Message[];
}

export interface GroupSlice {
  groups: Group[];
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  setGroups: (groups: Group[]) => void;
  createGroup: () => Group;
  leaveGroup: (groupId: string) => void;
  sendGroupMessage: (groupId: string, text: string) => void;
}
