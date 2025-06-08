"use client";

import Image from "next/image";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/";
import { useState } from "react";
import { Group } from "@/types/group";

export const Settings = ({ group }: { group: Group }) => {
  const users = useAppStore((s) => s.users);
  const updateGroups = useAppStore((s) => s.groups);
  const setGroups = useAppStore((s) => s.setGroups);

  const members = users.filter((u) => group.memberIds.includes(u.id));
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const [imageUrl, setImageUrl] = useState(group.imageUrl);
  const [newMember, setNewMember] = useState("");

  const handleRemoveMember = (userId: string) => {
    const updatedGroup = {
      ...group,
      memberIds: group.memberIds.filter((id) => id !== userId),
    };
    persist(updatedGroup);
  };

  const handleAddMember = () => {
    const foundUser = users.find(
      (u) => u.email === newMember || u.name === newMember,
    );
    if (!foundUser || group.memberIds.includes(foundUser.id)) return;
    const updatedGroup = {
      ...group,
      memberIds: [...group.memberIds, foundUser.id],
    };
    persist(updatedGroup);
    setNewMember("");
  };

  const persist = (updatedGroup: Group) => {
    const updatedGroups = updateGroups.map((g) =>
      g.id === group.id ? updatedGroup : g,
    );
    setGroups(updatedGroups);
  };

  const handleSave = () => {
    const updatedGroup = {
      ...group,
      name,
      description,
      imageUrl,
    };
    persist(updatedGroup);
  };

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="flex h-full flex-col space-y-5 overflow-y-auto p-4 sm:p-5"
    >
      <h3 className="text-lg font-medium text-slate-800">Group Settings</h3>

      {/* Group Name */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Group Name
        </label>
        <input
          title="Group Name"
          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition duration-150 sm:text-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Description
        </label>
        <textarea
          title="Group Description"
          rows={3}
          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition duration-150 sm:text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Group Image */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Group Image
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
            {imageUrl ? (
              <Image src={imageUrl} alt="Group" fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-100 text-center text-xs text-slate-400">
                No Image
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Paste image URL here..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm"
          />
        </div>
      </div>

      {/* Members */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Members ({members.length})
        </label>
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border bg-slate-50 p-3">
          {members.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg p-3 transition-colors duration-150 hover:bg-slate-100"
            >
              <div className="flex min-w-0 items-center space-x-3">
                <Image
                  alt={user.name}
                  src={user.avatarUrl}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveMember(user.id)}
                className="flex items-center space-x-1.5 rounded-md bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-200"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Add Member
        </label>
        <div className="flex space-x-2">
          <input
            className="block w-full flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
            placeholder="Enter name or email"
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button
            onClick={handleAddMember}
            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            <PlusIcon className="mr-1 inline-block h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-5 flex justify-end border-t border-slate-200 pt-3">
        <button
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};
