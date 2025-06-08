"use client";

import { useState } from "react";
import { useAppStore } from "@/store/";
import Image from "next/image";
import clsx from "clsx";
import { childMotionProps, parentMotionProps } from "@/constants/motion";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { DMThread } from "@/types/dm";

export const Messages = () => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const users = useAppStore((s) => s.users);
  const directMessages = useAppStore((s) => s.directMessages);
  const sendDirectMessage = useAppStore((s) => s.sendDirectMessage);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [text, setText] = useState("");

  const threads = directMessages.filter((dm) =>
    dm.userIds.includes(currentUserId),
  );

  const selectedThread = threads.find((dm) =>
    dm.userIds.includes(selectedUserId || ""),
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const getOtherUser = (dm: DMThread) =>
    users.find((u) => u.id !== currentUserId && dm.userIds.includes(u.id));

  const handleSend = () => {
    if (!text.trim() || !selectedUserId) return;
    sendDirectMessage(selectedUserId, text.trim());
    setText("");
  };

  return (
    <motion.div
      {...parentMotionProps}
      className="grid h-auto grid-cols-1 gap-6 md:h-[calc(100vh-8rem)] md:grid-cols-3"
    >
      {/* Left Panel */}
      <motion.div
        {...childMotionProps}
        className="flex flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300 md:col-span-1"
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-800">Messages</h2>
        </div>
        <div className="flex-grow divide-y divide-slate-100 overflow-y-auto">
          {threads.map((dm) => {
            const otherUser = getOtherUser(dm);
            const lastMessage = dm.messages[dm.messages.length - 1];
            const isUnread =
              lastMessage?.userId === otherUser?.id &&
              selectedUserId !== otherUser?.id;

            return (
              <div
                key={otherUser?.id}
                onClick={() => setSelectedUserId(otherUser?.id as string)}
                className={clsx(
                  "flex cursor-pointer items-center space-x-3 p-3 transition-colors duration-150 hover:bg-slate-50",
                  selectedUserId === otherUser?.id && "bg-indigo-50",
                )}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={otherUser?.avatarUrl || ""}
                    alt={`${otherUser?.name}'s profile`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="truncate text-sm font-semibold text-slate-700">
                      {otherUser?.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {" "}
                      {/* could calc time */}{" "}
                    </p>
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {lastMessage?.userId === currentUserId ? "You: " : ""}
                    {lastMessage?.text}
                  </p>
                </div>
                {isUnread && (
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        {...childMotionProps}
        className="flex flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300 md:col-span-2"
      >
        {selectedUser ? (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center space-x-3 border-b border-slate-200 p-3">
              <Image
                src={selectedUser.avatarUrl}
                alt={`${selectedUser.name}'s profile`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-semibold text-slate-800">
                  {selectedUser.name}
                </h2>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>

            {/* Message List */}
            <div className="flex-grow space-y-1 overflow-y-auto p-4">
              {selectedThread?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={clsx(
                    "my-1 flex",
                    msg.userId === currentUserId
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  <div
                    className={clsx(
                      "max-w-[75%] p-2.5 text-sm shadow-sm",
                      msg.userId === currentUserId
                        ? "rounded-l-lg rounded-tr-lg bg-indigo-600 text-white"
                        : "rounded-tl-lg rounded-r-lg bg-white text-slate-800",
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2 border-t border-slate-200 bg-slate-50 p-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="block w-full rounded-full border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-800 placeholder-slate-400 transition duration-150 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="Type a message..."
              />
              <button
                title="Send message"
                onClick={handleSend}
                disabled={!text.trim()}
                className="rounded-full bg-indigo-600 p-2 text-white transition-colors duration-150 hover:bg-indigo-700 disabled:bg-slate-300"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Select a conversation to start chatting.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
