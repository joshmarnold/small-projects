"use client";

import Image from "next/image";
import { User, Post } from "@/types";

interface HeaderProps {
  author: User;
  post: Post;
}

export const Header = ({ author, post }: HeaderProps) => {
  const createdAt = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center space-x-3 p-4 sm:p-5">
      <Image
        alt={`${author.name}'s profile`}
        src={author.avatarUrl}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
      />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800">{author.name}</h3>
        <p className="text-xs text-slate-500">{createdAt}</p>
      </div>
    </div>
  );
};
