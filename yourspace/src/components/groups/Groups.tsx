"use client";

import { useAppStore } from "@/store/";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from "clsx";
import { RightPanel } from "./right-panel/RightPanel";
import { childMotionProps, parentMotionProps } from "@/constants/motion";
import { motion } from "framer-motion";

export const Groups = () => {
  const getCurrentUser = useAppStore((s) => s.getCurrentUser);
  const currentUserId = getCurrentUser()?.id as string;
  const groups = useAppStore((s) => s.groups);
  const groupsUserIsIn = groups.filter((g) =>
    g.memberIds.includes(currentUserId),
  );
  const selectedGroupId = useAppStore((s) => s.selectedGroupId);
  const setSelectedGroupId = useAppStore((s) => s.setSelectedGroupId);
  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || null;
  const createGroup = useAppStore((s) => s.createGroup);

  return (
    <motion.div
      {...parentMotionProps}
      className="grid h-auto w-full grid-cols-1 gap-6 overflow-x-hidden pb-10 md:h-[calc(100vh-8rem)] md:grid-cols-3"
    >
      {/* Left panel */}
      <motion.div
        {...childMotionProps}
        className="flex max-w-full flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300 md:col-span-1"
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-800">Groups</h2>
          <button
            title="Create New Group"
            className="cursor-pointer rounded-full bg-indigo-100 p-1 text-indigo-600 transition-colors duration-150 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
            onClick={() => {
              const newGroup = createGroup();
              setSelectedGroupId(newGroup.id);
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Group list */}
        <div className="flex-grow divide-y divide-slate-100 overflow-y-auto">
          {groupsUserIsIn.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              className={clsx(
                "flex cursor-pointer items-center space-x-3 p-3 transition-colors duration-150 hover:bg-slate-50",
                selectedGroupId === group.id && "bg-indigo-50",
              )}
            >
              {group.imageUrl ? (
                <Image
                  src={group.imageUrl}
                  alt={group.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200 text-sm font-semibold text-slate-500">
                  {group.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-slate-800">
                  {group.name}
                </h3>
                <p className="truncate text-xs text-slate-500">
                  {group.memberIds.length} members
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <RightPanel group={selectedGroup} />
    </motion.div>
  );
};
