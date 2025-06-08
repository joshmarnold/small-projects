type Tab =
  | "feed"
  | "groups"
  | "messages"
  | "connections"
  | "notifications"
  | "profile";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  description?: string;
  avatarUrl: string;
  online: boolean;
  followers: string[]; // user IDs
  following: string[]; // user IDs
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: string[]; // user IDs
  comments: Message[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberIds: string[];
  messages: Message[];
}

export interface DMThread {
  userIds: [string, string]; // always two users
  messages: Message[];
}

type Notification = {
  id: string;
  userId: string; // who receives it
  actorId: string; // who caused it
  type: "like" | "comment" | "follow" | "message";
  createdAt: string;
  read: boolean;
};

export interface AppState {
  currentUserId: string;
  activeTab: Tab;

  users: User[];
  posts: Post[];
  groups: Group[];
  directMessages: DMThread[];
  notifications: Notification[];
  selectedGroupId: string | null;
  
  setSelectedGroupId: (id: string | null) => void;

  addNotification: (
    userId: string,
    data: Omit<Notification, "id" | "createdAt" | "read" | "userId">,
  ) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;

  setActiveTab: (tab: Tab) => void;
  switchUser: (userId: string) => void;

  setGroups: (groups: Group[]) => void; // ✅ add this

  addPost: (content: string, imageUrl?: string) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, text: string) => void;

  sendGroupMessage: (groupId: string, text: string) => void;
  sendDirectMessage: (otherUserId: string, text: string) => void;

  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;

  updateUser: (userId: string, data: Partial<User>) => void;

  createGroup: () => Group;

  leaveGroup: (groupId: string) => void;

  getCurrentUser: () => User | null;
}
