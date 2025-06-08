export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  description?: string;
  avatarUrl: string;
  online: boolean;
  followers: string[];
  following: string[];
}

export interface UserSlice {
  currentUserId: string;
  users: User[];
  getCurrentUser: () => User | null;
  switchUser: (userId: string) => void;
  updateUser: (userId: string, data: Partial<User>) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}
