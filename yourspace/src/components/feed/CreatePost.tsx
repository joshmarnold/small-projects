"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { User } from "@/types";
import { childMotionProps } from "@/constants/motion";
import { useAppStore } from "@/store/useAppStore";

interface CreatePostProps {
  currentUser: User;
}

export const CreatePost = ({ currentUser }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const addPost = useAppStore((s) => s.addPost);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !previewUrl) return;
    addPost(content.trim(), previewUrl || "");
    setContent("");
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <motion.div
      {...childMotionProps}
      className="mt-4 rounded-xl border border-slate-200/50 bg-white p-4 shadow-lg transition-colors duration-300 sm:mt-0 sm:p-5"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <Image
          alt={`${currentUser.name}'s profile`}
          src={currentUser.avatarUrl}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's orbiting your mind, ${currentUser.name}?`}
            rows={3}
            className="block w-full resize-none rounded-lg border border-slate-200 bg-transparent p-3 text-sm text-slate-800 placeholder-slate-400 transition duration-150 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-300"
          />

          {previewUrl && (
            <div className="mt-3">
              <Image
                width={60}
                height={60}
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg border border-slate-200"
              />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-1">
              <label className="cursor-pointer rounded-full p-1 text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1">
                <PhotoIcon className="h-4 w-4" />
                <input
                  title="Add an image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={handlePost}
              disabled={!content.trim() && !previewUrl}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
