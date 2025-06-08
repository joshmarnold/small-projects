import { create } from "zustand";
import { AppState } from "@/types/app-state";
import { createUserSlice } from "./slices/userSlice";
import { createPostSlice } from "./slices/postSlice";
import { createNotificationSlice } from "./slices/notificationSlice";
import { createGroupSlice } from "./slices/groupSlice";
import { createMessageSlice } from "./slices/messageSlice";

export const useAppStore = create<AppState>()((set, get, store) => ({
  ...createUserSlice(set, get, store),
  ...createPostSlice(set, get, store),
  ...createNotificationSlice(set, get, store),
  ...createGroupSlice(set, get, store),
  ...createMessageSlice(set, get, store),
  activeTab: "feed",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
