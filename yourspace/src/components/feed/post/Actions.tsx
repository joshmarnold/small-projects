"use client";

import { useAppStore } from "@/store/useAppStore";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface ActionsProps {
  postId: string;
  likes: string[];
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const Actions = ({ postId, likes, inputRef }: ActionsProps) => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const likePost = useAppStore((s) => s.likePost);

  const hasLiked = likes.includes(currentUserId);

  return (
    <div className="flex items-center justify-around border-t border-slate-100 px-2 py-1.5 sm:px-4">
      <motion.button
        onClick={() => likePost(postId)}
        whileTap={{ scale: 0.9 }}
        className="flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-red-500"
      >
        {hasLiked ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
        <span>{hasLiked ? "Liked" : "Like"}</span>
      </motion.button>

      <motion.button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        whileTap={{ scale: 0.95 }}
        className="flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
        <span>Comment</span>
      </motion.button>
    </div>
  );
};
