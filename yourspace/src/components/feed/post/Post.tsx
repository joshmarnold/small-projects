"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/";
import Image from "next/image";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { childMotionProps } from "@/constants/motion";
import { Header } from "./Header";
import { Comments } from "./Comments";
import { CommentInput } from "./CommentInput";
import { Actions } from "./Actions";
import { useRef } from "react";
import { Post as PostType } from "@/types/post";

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  const author = useAppStore((s) => s.users.find((u) => u.id === post.userId));
  const inputRef = useRef<HTMLInputElement>(null);

  if (!author) return null;

  return (
    <motion.div
      {...childMotionProps}
      className="overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300"
    >
      <Header author={author} post={post} />

      <div className="px-4 pb-3 sm:px-5">
        <p className="text-sm break-words whitespace-pre-wrap text-slate-700">
          {post.content}
        </p>
      </div>

      {post.imageUrl && (
        <div className="flex max-h-[60vh] justify-center overflow-hidden bg-slate-100">
          <Image
            alt="Post content"
            src={post.imageUrl}
            width={800}
            height={600}
            className="h-auto max-h-[60vh] w-auto max-w-full object-contain"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center space-x-4 px-4 py-2 text-xs text-slate-500 sm:px-5">
        <span className="flex items-center">
          <HeartIconSolid className="mr-1 h-3.5 w-3.5 text-red-500" />
          {post.likes.length} likes
        </span>
        <span>{post.comments.length} comments</span>
      </div>

      <Actions postId={post.id} likes={post.likes} inputRef={inputRef} />

      <Comments comments={post.comments} />

      <CommentInput
        postId={post.id}
        userAvatar={author.avatarUrl}
        inputRef={inputRef}
      />
    </motion.div>
  );
};
