"use client";

import { Group } from "@/types";
import { UsersIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Chat } from "./Chat";
import { Settings } from "./Settings";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { childMotionProps } from "@/constants/motion";

export const RightPanel = ({ group }: { group: Group | null }) => {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setShowSettings(false);
  }, [group]);

  if (!group) {
    return (
      <motion.div
        {...childMotionProps}
        className="flex flex-col items-center justify-center rounded-xl border border-slate-200/50 bg-white p-10 text-center text-slate-500 shadow-lg md:col-span-2"
      >
        <UsersIcon className="mb-4 h-16 w-16 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Select a Group</h3>
        <p className="text-sm">Choose or create a group.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...childMotionProps}
      className="flex max-w-full flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300 md:col-span-2"
    >
      <Header
        group={group}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      {showSettings ? <Settings group={group} /> : <Chat group={group} />}
    </motion.div>
  );
};
