import { AppState } from "@/types/app-state";
import { Message, MessageSlice } from "@/types/message";
import { StateCreator } from "zustand";

export const createMessageSlice: StateCreator<
  AppState,
  [],
  [],
  MessageSlice
> = (set, get) => ({
  directMessages: [],

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

    const existing = directMessages.find(
      (dm) =>
        dm.userIds.includes(participants[0]) &&
        dm.userIds.includes(participants[1]),
    );

    if (existing) {
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
});
