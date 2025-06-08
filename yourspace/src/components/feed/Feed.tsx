"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/";
import { Post } from "./post/Post";
import { UserBox } from "./UserBox";
import { CreatePost } from "./CreatePost";
import { parentMotionProps } from "@/constants/motion";

export const Feed = () => {
  const currentUser = useAppStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );
  const posts = useAppStore((s) => s.posts);

  if (!currentUser) return null;

  return (
    <div className="mx-auto w-full max-w-7xl flex-grow pb-20 sm:pb-8 lg:px-8">
      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8"
        {...parentMotionProps}
      >
        <UserBox user={currentUser} />

        <div className="col-span-1 space-y-6 lg:col-span-2">
          <CreatePost currentUser={currentUser} />

          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
