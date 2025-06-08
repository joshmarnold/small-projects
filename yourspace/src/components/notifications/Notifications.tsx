"use client";

import { useAppStore } from "@/store/";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/solid";
import { childWithoutParentMotionProps } from "@/constants/motion";

export const Notifications = () => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const notifications = useAppStore((s) => s.notifications);
  const filteredNotifications = notifications.filter(
    (n) => n.userId === currentUserId,
  );
  const users = useAppStore((s) => s.users);
  const markAllNotificationsRead = useAppStore(
    (s) => s.markAllNotificationsRead,
  );
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);

  const getActor = (id: string) => users.find((u) => u.id === id);
  const getLabel = (type: string) => {
    switch (type) {
      case "message":
        return {
          text: "sent you a message.",
          icon: ChatBubbleLeftRightIcon,
          color: "text-sky-500",
        };
      case "like":
        return {
          text: "liked your post.",
          icon: HeartIcon,
          color: "text-red-500",
        };
      case "comment":
        return {
          text: "commented on your post.",
          icon: ChatBubbleLeftRightIcon,
          color: "text-indigo-500",
        };
      case "follow":
        return {
          text: "started following you.",
          icon: UserPlusIcon,
          color: "text-emerald-500",
        };
      default:
        return { text: "", icon: BellIcon, color: "text-gray-400" };
    }
  };

  const formatTime = (timestamp: string) => {
    const delta = (Date.now() - new Date(timestamp).getTime()) / 1000;
    if (delta < 60) return "now";
    if (delta < 3600) return `${Math.floor(delta / 60)}m`;
    if (delta < 86400) return `${Math.floor(delta / 3600)}h`;
    return `${Math.floor(delta / 86400)}d`;
  };

  return (
    <motion.div
      {...childWithoutParentMotionProps}
      className="mx-auto max-w-full overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300"
    >
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
        <button
          onClick={markAllNotificationsRead}
          className="cursor-pointer text-xs font-medium whitespace-nowrap text-indigo-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-[calc(100vh-12rem)] divide-y divide-slate-100 overflow-y-auto">
        {filteredNotifications.map((n) => {
          const actor = getActor(n.actorId);
          const { icon: Icon, text, color } = getLabel(n.type);
          return (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`flex cursor-pointer items-start space-x-3 p-4 transition-colors duration-150 ${!n.read ? "bg-indigo-50/50 hover:bg-indigo-100/70" : "hover:bg-slate-50"} `}
            >
              <div className="relative mt-0.5 flex-shrink-0">
                <Image
                  alt={`${actor?.name}'s profile`}
                  src={actor?.avatarUrl || ""}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
                />
                <span className="absolute -right-1 -bottom-1 rounded-full bg-white p-0.5 shadow">
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-800">
                  <span className="font-semibold">{actor?.name}</span> {text}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatTime(n.createdAt)}
                </p>
              </div>
              {!n.read && (
                <div className="mt-1 h-2 w-2 flex-shrink-0 self-center rounded-full bg-indigo-500" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
