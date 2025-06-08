"use client";

import { motion } from "framer-motion";
import { childMotionProps } from "@/constants/motion";

export const UserCardGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    {...childMotionProps}
    className="rounded-xl border border-slate-200/50 bg-white p-5 shadow-lg transition-colors duration-300"
  >
    <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>
    <div className="-mr-2 max-h-96 space-y-1 overflow-y-auto pr-2">
      {children}
    </div>
  </motion.div>
);
