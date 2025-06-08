"use client";

import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";
import { Message } from "@/types";
import { useState } from "react";

interface CommentsProps {
  comments: Message[];
}

export const Comments = ({ comments }: CommentsProps) => {
  const [showAll, setShowAll] = useState(false);

  const toggleComments = () => setShowAll((prev) => !prev);

  const displayed = showAll ? comments : comments.slice(0, 1);

  if (comments.length === 0) return null;

  return (
    <div className="space-y-3 border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-5 sm:py-4">
      {displayed.map((comment) => {
        const commenter = useAppStore
          .getState()
          .users.find((u) => u.id === comment.userId);
        if (!commenter) return null;

        return (
          <div key={comment.id} className="flex items-center space-x-2">
            <Image
              alt={`${commenter.name}'s profile`}
              src={commenter.avatarUrl}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full border border-slate-200 object-cover shadow-sm"
            />
            <div className="flex-1 rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
              <p className="text-xs">
                <span className="font-semibold text-slate-800">
                  {commenter.name}
                </span>
                <span className="ml-1.5 text-slate-600">{comment.text}</span>
              </p>
            </div>
          </div>
        );
      })}

      {comments.length > 1 && (
        <button
          onClick={toggleComments}
          className="ml-8 cursor-pointer text-xs font-medium text-indigo-600 hover:underline"
        >
          {showAll ? "Hide comments" : `View all ${comments.length} comments`}
        </button>
      )}
    </div>
  );
};
