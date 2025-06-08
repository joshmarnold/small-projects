import { AppState } from "@/types/app-state";
import { NotificationSlice } from "@/types/notification";
import { StateCreator } from "zustand";

export const createNotificationSlice: StateCreator<
  AppState,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  notifications: [],

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

  markNotificationRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    }));
  },

  markAllNotificationsRead: () => {
    const { currentUserId, notifications } = get();
    set({
      notifications: notifications.map((n) =>
        n.userId === currentUserId ? { ...n, read: true } : n,
      ),
    });
  },
});
