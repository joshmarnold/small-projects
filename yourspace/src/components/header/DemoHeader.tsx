"use client";

import { useAppStore } from "@/store/";
import clsx from "clsx";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const DemoHeader = () => {
  const users = useAppStore((s) => s.users);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const switchUser = useAppStore((s) => s.switchUser);

  if (!users.length) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 transition-colors duration-300 print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-2 sm:min-h-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center text-xs font-medium text-amber-700">
            <InformationCircleIcon className="mr-1.5 h-4 w-4 text-amber-600" />
            Demo Mode: Quick User Switch
          </p>

          <div className="flex flex-wrap gap-[7px]">
            {users.map((user) => (
              <button
                key={user.id}
                className={clsx(
                  "cursor-pointer rounded-md px-2 py-0.5 text-xs transition-colors",
                  currentUserId === user.id
                    ? "bg-amber-500 font-semibold text-white"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200",
                )}
                onClick={() => switchUser(user.id)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
