"use client";

import { Group } from "@/types";
import Image from "next/image";
import {
  Cog6ToothIcon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

type RightPanelProps = {
  group: Group | null;
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({
  group,
  setShowSettings,
  showSettings,
}: RightPanelProps) => {
  const leaveGroup = useAppStore((s) => s.leaveGroup);
  const setSelectedGroupId = useAppStore((s) => s.setSelectedGroupId);

  if (!group) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 p-3"
    >
      <div className="flex min-w-0 items-center space-x-3">
        {group.imageUrl ? (
          <Image
            src={group.imageUrl}
            alt={group.name}
            width={40}
            height={40}
            className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200 text-sm font-semibold text-slate-500">
            {group.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-slate-800">
            {group.name}
          </h2>
        </div>
      </div>
      <div className="flex space-x-1">
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          title={showSettings ? "Close Settings" : "Group Settings"}
          className="rounded-full bg-slate-100 p-1 text-slate-600 transition-colors duration-150 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
        >
          {showSettings ? (
            <XMarkIcon className="h-4 w-4" />
          ) : (
            <Cog6ToothIcon className="h-4 w-4" />
          )}
        </button>
        <button
          title="Leave Group"
          className="rounded-full bg-rose-100 p-1 text-rose-600 transition-colors duration-150 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
          onClick={() => {
            leaveGroup(group.id);
            setSelectedGroupId(null); // this resets the right panel
          }}
        >
          <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};
