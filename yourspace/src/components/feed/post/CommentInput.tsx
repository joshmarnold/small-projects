"use client";

import { useState } from "react";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "@/store/useAppStore";

interface CommentInputProps {
  postId: string;
  userAvatar: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const CommentInput = ({
  postId,
  userAvatar,
  inputRef,
}: CommentInputProps) => {
  const commentOnPost = useAppStore((s) => s.commentOnPost);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    commentOnPost(postId, text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center space-x-2 border-t border-slate-100 bg-slate-50/50 p-2 sm:p-3">
      <Image
        alt="Your profile"
        src={userAvatar}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full border border-slate-200 object-cover shadow-sm"
      />
      <div className="relative flex-1">
        <input
          className="block w-full rounded-full border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-800 placeholder-slate-400 transition duration-150 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a comment..."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button
          title="Post comment"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 transform cursor-pointer rounded-full p-1 text-indigo-600 hover:text-indigo-800 disabled:text-slate-400"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
