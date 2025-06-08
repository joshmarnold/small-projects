"use client";

import { useAppStore } from "@/store/useAppStore";
import clsx from "clsx";
import {
  HomeIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

const tabs = [
  { key: "feed", label: "Feed", icon: HomeIcon },
  { key: "groups", label: "Groups", icon: UsersIcon },
  { key: "messages", label: "Messages", icon: ChatBubbleLeftRightIcon },
  { key: "connections", label: "Connections", icon: LinkIcon },
] as const;

export const MainNav = () => {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const currentUser = useAppStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );
  const currentUserId = useAppStore((s) => s.currentUserId);
  const notifications = useAppStore((s) => s.notifications);
  const filteredNotifications = notifications.filter(
    (n) => n.userId === currentUserId && !n.read,
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600 sm:text-2xl">
              YourSpace
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="relative hidden items-center space-x-1 md:flex">
            {tabs.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={clsx(
                    "relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                  )}
                >
                  <Icon
                    className={clsx(
                      "mr-1.5 h-5 w-5 flex-shrink-0",
                      isActive ? "text-indigo-600" : "text-slate-400",
                    )}
                  />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute right-0 bottom-0 left-0 h-0.5 bg-indigo-600"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Notification Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="relative cursor-pointer rounded-full p-1.5 text-slate-500 transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
              aria-label="Notifications"
              onClick={() => setActiveTab("notifications")}
            >
              <BellIcon className="h-5 w-5" />
              {!!filteredNotifications.length && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {filteredNotifications.length}
                </span>
              )}
            </motion.button>

            {/* Avatar */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="cursor-pointer rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Profile"
              onClick={() => setActiveTab("profile")}
            >
              <Image
                alt={`${currentUser?.name}'s profile`}
                className="h-8 w-8 rounded-full border border-slate-200 object-cover shadow-sm"
                src={currentUser?.avatarUrl || ""}
                width={32}
                height={32}
              />
            </motion.button>

            {/* Logout */}
            <button
              className="cursor-pointer rounded-full p-1.5 text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
              aria-label="Logout"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="flex justify-around border-t border-slate-200 bg-white/90 backdrop-blur-sm transition-colors duration-300 md:hidden">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={clsx(
                "relative flex flex-col items-center justify-center px-1 py-2 text-xs font-medium focus:outline-none",
                isActive
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-indigo-600",
              )}
            >
              {isActive && (
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-indigo-600" />
              )}
              <Icon className="mb-0.5 h-5 w-5" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
