"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "@/types";
import { childMotionProps } from "@/constants/motion";
import { useAppStore } from "@/store/useAppStore";

interface UserBoxProps {
  user: User;
}

export const UserBox = ({ user }: UserBoxProps) => {
  const posts = useAppStore((s) => s.posts);
  const usersPosts = posts.filter((post) => post.userId === user?.id);

  return (
    <motion.aside
      {...childMotionProps}
      className="sticky top-2 left-0 hidden space-y-6 lg:col-span-1 lg:block"
    >
      <div className="sticky top-20 left-0 rounded-xl border border-slate-200/50 bg-white p-5 shadow-lg transition-colors duration-300">
        <div className="mb-4 flex items-center space-x-4">
          <Image
            alt={`${user.name}'s profile`}
            src={user.avatarUrl}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-slate-200 object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {user.name}
            </h3>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {user.description}
        </p>

        <div className="flex justify-around border-t border-slate-200 pt-3 text-center text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-800">
              {user.following.length}
            </p>
            <p>Following</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              {user.followers.length}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              {usersPosts?.length || 0}
            </p>
            <p>Posts</p>
          </div>
        </div>

        <button className="mt-4 w-full cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-150 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none">
          View Profile
        </button>
      </div>
    </motion.aside>
  );
};
