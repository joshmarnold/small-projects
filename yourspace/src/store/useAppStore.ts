import { AppState, Group, Message, Post } from "@/types";
import { create } from "zustand";

const initialUserId =
  typeof window !== "undefined"
    ? localStorage.getItem("yourspace-current-user") || "1"
    : "1";

export const useAppStore = create<AppState>((set, get) => ({
  currentUserId: initialUserId,
  activeTab: "feed",

  users: [],
  posts: [],
  groups: [],
  directMessages: [],
  notifications: [],
  selectedGroupId: null,

  setSelectedGroupId: (id: string | null) => set({ selectedGroupId: id }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  getCurrentUser: () => {
    const { currentUserId, users } = get();
    return users.find((user) => user.id === currentUserId) || null;
  },

  switchUser: (userId) => {
    localStorage.setItem("yourspace-current-user", userId);
    set({ currentUserId: userId });
  },

  updateUser: (userId, data) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, ...data } : u)),
    }));
  },

  addNotification: (userId, data) => {
    set((state) => ({
      notifications: [
        {
          id: Date.now().toString(),
          userId,
          actorId: data.actorId,
          type: data.type,
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.userId === state.currentUserId ? { ...n, read: true } : n,
      ),
    }));
  },

  markNotificationRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    }));
  },

  addPost: (content, imageUrl) => {
    const { currentUserId, posts } = get();
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUserId,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    set({ posts: [newPost, ...posts] });
  },

  likePost: (postId) => {
    const { currentUserId, posts, addNotification } = get();

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;

      const hasLiked = post.likes.includes(currentUserId);
      const newLikes = hasLiked
        ? post.likes.filter((id) => id !== currentUserId)
        : [...post.likes, currentUserId];

      if (!hasLiked && currentUserId !== post.userId) {
        addNotification(post.userId, {
          actorId: currentUserId,
          type: "like",
        });
      }

      return { ...post, likes: newLikes };
    });

    set({ posts: updatedPosts });
  },

  commentOnPost: (postId, text) => {
    const { currentUserId, posts, addNotification } = get();

    const comment: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;

      if (post.userId !== currentUserId) {
        addNotification(post.userId, {
          actorId: currentUserId,
          type: "comment",
        });
      }

      return { ...post, comments: [...post.comments, comment] };
    });

    set({ posts: updatedPosts });
  },

  followUser: (targetId) => {
    const { currentUserId, users, addNotification } = get();
    if (currentUserId === targetId) return;

    let alreadyFollowing = false;

    const updatedUsers = users.map((user) => {
      if (user.id === currentUserId) {
        alreadyFollowing = user.following.includes(targetId);
        return alreadyFollowing
          ? user
          : {
              ...user,
              following: [...user.following, targetId],
            };
      }

      if (user.id === targetId) {
        return user.followers.includes(currentUserId)
          ? user
          : {
              ...user,
              followers: [...user.followers, currentUserId],
            };
      }

      return user;
    });

    set({ users: updatedUsers });

    if (!alreadyFollowing) {
      addNotification(targetId, {
        actorId: currentUserId,
        type: "follow",
      });
    }
  },

  unfollowUser: (targetId) => {
    const { currentUserId, users } = get();

    set({
      users: users.map((user) => {
        if (user.id === currentUserId) {
          return {
            ...user,
            following: user.following.filter((id) => id !== targetId),
          };
        }

        if (user.id === targetId) {
          return {
            ...user,
            followers: user.followers.filter((id) => id !== currentUserId),
          };
        }

        return user;
      }),
    });
  },

  sendDirectMessage: (otherUserId, text) => {
    const { currentUserId, directMessages, addNotification } = get();

    const participants: [string, string] = [
      currentUserId,
      otherUserId,
    ].sort() as [string, string];

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    const existingThread = directMessages.find(
      (dm) =>
        dm.userIds.includes(participants[0]) &&
        dm.userIds.includes(participants[1]),
    );

    if (existingThread) {
      set({
        directMessages: directMessages.map((dm) =>
          dm.userIds[0] === participants[0] && dm.userIds[1] === participants[1]
            ? { ...dm, messages: [...dm.messages, message] }
            : dm,
        ),
      });
    } else {
      set({
        directMessages: [
          ...directMessages,
          { userIds: participants, messages: [message] },
        ],
      });
    }

    if (currentUserId !== otherUserId) {
      addNotification(otherUserId, {
        actorId: currentUserId,
        type: "message",
      });
    }
  },

  sendGroupMessage: (groupId, text) => {
    const { currentUserId } = get();
    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, messages: [...g.messages, message] } : g,
      ),
    }));
  },

  createGroup: () => {
    const { currentUserId, groups } = get();
    const newGroup: Group = {
      id: Date.now().toString(),
      name: "New Group",
      description: "Edit description...",
      imageUrl: "",
      memberIds: [currentUserId],
      messages: [],
    };
    set({ groups: [newGroup, ...groups] });
    return newGroup;
  },

  setGroups: (groups) => set({ groups }),

  leaveGroup: (groupId) => {
    const { currentUserId, groups } = get();
    set({
      groups: groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              memberIds: group.memberIds.filter((id) => id !== currentUserId),
            }
          : group,
      ),
    });
  },
}));
