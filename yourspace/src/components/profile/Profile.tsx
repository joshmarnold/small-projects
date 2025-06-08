"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";
import { motion } from "framer-motion";
import { childWithoutParentMotionProps } from "@/constants/motion";

export const Profile = () => {
  const currentUser = useAppStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );
  const updateUser = useAppStore((s) => s.updateUser); // assume you add this

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [bio, setBio] = useState(currentUser?.description || "");
  const [previewUrl, setPreviewUrl] = useState(currentUser?.avatarUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!currentUser) return;
    updateUser(currentUser.id, {
      name,
      email,
      description: bio,
      avatarUrl: previewUrl,
    });
  };

  if (!currentUser) return null;

  return (
    <motion.div
      {...childWithoutParentMotionProps}
      className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-lg transition-colors duration-300"
    >
      <div className="relative h-32 bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 sm:h-40">
        <div className="absolute bottom-0 left-6 translate-y-1/2 transform rounded-full border-4 border-white bg-white shadow-lg">
          <Image
            alt={`${name}'s profile`}
            src={previewUrl}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="px-4 pt-16 pb-6 sm:px-6 sm:pt-20">
        <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {name}
            </h2>
            <p className="text-sm text-slate-500">{email}</p>
          </div>
          <button
            onClick={handleSave}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            Save Profile
          </button>
        </div>

        <p className="mb-6 text-sm text-slate-600">{bio}</p>

        <div className="mb-6 flex space-x-6 border-t border-b border-slate-200 py-3 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-800">1</span> Posts
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              {currentUser.followers.length}
            </span>{" "}
            Followers
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              {currentUser.following.length}
            </span>{" "}
            Following
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800">
            Edit Profile
          </h3>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <Image
                alt="Profile Preview"
                src={previewUrl}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border object-cover"
              />
              <label className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-150 hover:bg-slate-50">
                <span>Change</span>
                <input
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  type="file"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Name
            </label>
            <input
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Tell the world about yourself..."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
