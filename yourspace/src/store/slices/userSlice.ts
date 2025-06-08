import { StateCreator } from "zustand";
import { AppState } from "@/types/app-state";
import { UserSlice } from "@/types/user";

export const createUserSlice: StateCreator<AppState, [], [], UserSlice> = (
  set,
  get,
) => ({
  currentUserId:
    typeof window !== "undefined"
      ? localStorage.getItem("yourspace-current-user") || "1"
      : "1",

  users: [],

  getCurrentUser: () => {
    const { currentUserId, users } = get();
    return users.find((u) => u.id === currentUserId) || null;
  },

  switchUser: (id) => {
    localStorage.setItem("yourspace-current-user", id);
    set({ currentUserId: id });
  },

  updateUser: (userId, data) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, ...data } : u)),
    }));
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
});
