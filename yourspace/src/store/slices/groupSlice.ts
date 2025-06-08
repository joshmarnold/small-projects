import { StateCreator } from "zustand";
import { AppState } from "@/types/app-state";
import { Group, GroupSlice } from "@/types/group";
import { Message } from "@/types/message";

export const createGroupSlice: StateCreator<AppState, [], [], GroupSlice> = (
  set,
  get,
) => ({
  groups: [],
  selectedGroupId: null,

  setSelectedGroupId: (id) => set({ selectedGroupId: id }),

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

  leaveGroup: (groupId) => {
    const { currentUserId, groups } = get();
    set({
      groups: groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              memberIds: g.memberIds.filter((id) => id !== currentUserId),
            }
          : g,
      ),
    });
  },

  setGroups: (groups) => set({ groups }),
});
