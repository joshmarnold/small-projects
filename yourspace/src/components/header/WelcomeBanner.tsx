"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const WelcomeBanner = () => {
  const currentUser = useAppStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true); // reset visibility when user changes
  }, [currentUser?.id]);

  if (!currentUser || !visible) return null;

  return (
    <div className="relative border-b border-green-200 bg-green-50 p-3 text-sm text-green-700">
      <div className="flex items-center justify-center">
        <InformationCircleIcon className="mr-2 h-5 w-5 text-green-600" />
        <span>Switched to {currentUser.name}&apos;s account.</span>
      </div>

      <button
        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-green-600 hover:text-green-800"
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
      >
        <XMarkIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
      </button>
    </div>
  );
};
