export type NotificationType = "like" | "comment" | "follow" | "message";

export interface Notification {
  id: string;
  userId: string;
  actorId: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
}

export interface NotificationSlice {
  notifications: Notification[];
  addNotification: (
    userId: string,
    data: Omit<Notification, "id" | "createdAt" | "read" | "userId">,
  ) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}
