"use client";

import { Group } from "@/types";
import { UsersIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";
import { useState, useRef } from "react";
import clsx from "clsx";
import { childMotionProps, parentMotionProps } from "@/constants/motion";
import { motion } from "framer-motion";

export const Chat = ({ group }: { group: Group | null }) => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const users = useAppStore((s) => s.users);
  const sendGroupMessage = useAppStore((s) => s.sendGroupMessage);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!group) {
    return (
      <div className="flex max-w-full flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300 md:col-span-2">
        <div className="flex flex-grow flex-col items-center justify-center p-10 text-center text-slate-500">
          <UsersIcon className="mb-4 h-16 w-16 text-slate-300" />
          <h3 className="text-lg font-medium text-slate-700">Select a Group</h3>
          <p className="text-sm">Choose or create a group.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hiddenbg-white flex h-full max-w-full flex-col shadow-lg transition-colors duration-300 md:col-span-2">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto">
        <motion.div {...parentMotionProps} className="space-y-4 p-4">
          {group.messages.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              No messages yet.
            </div>
          )}
          {group.messages.length > 0 &&
            group.messages.map((msg) => {
              const isOwn = msg.userId === currentUserId;
              const sender = users.find((u) => u.id === msg.userId);

              return (
                <motion.div
                  {...childMotionProps}
                  key={msg.id}
                  className={clsx(
                    "flex",
                    isOwn ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={clsx(
                      "flex max-w-[75%] items-end space-x-2",
                      isOwn && "flex-row-reverse space-x-reverse",
                    )}
                  >
                    {!isOwn && (
                      <Image
                        src={sender?.avatarUrl || ""}
                        alt={sender?.name || ""}
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full border border-slate-200 object-cover shadow-sm"
                      />
                    )}
                    <div
                      className={clsx(
                        "rounded-lg p-2.5 shadow-sm",
                        isOwn
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-slate-800",
                      )}
                    >
                      {!isOwn && (
                        <p className="mb-1 text-xs font-semibold text-indigo-700">
                          {sender?.name}
                        </p>
                      )}
                      <p className="text-sm break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                      <p
                        className={clsx(
                          "mt-1 text-right text-[10px]",
                          isOwn ? "text-indigo-100/80" : "text-slate-400",
                        )}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>

      {/* Message Input */}
      <div className="flex flex-shrink-0 items-center space-x-2 border-t border-slate-200 bg-slate-50 p-3">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-800 placeholder-slate-400 transition duration-150 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
          type="text"
        />
        <button
          title="Send Message"
          disabled={!text.trim()}
          onClick={() => {
            if (!text.trim()) return;
            sendGroupMessage(group.id, text.trim());
            setText("");
          }}
          className="rounded-full bg-indigo-600 p-2 text-white transition-colors duration-150 hover:bg-indigo-700 disabled:bg-slate-300"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
