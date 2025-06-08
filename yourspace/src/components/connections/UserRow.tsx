import Image from "next/image";
import React from "react";

interface Action {
  label: string | React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary" | "chat";
}

export const UserRow = ({
  user,
  actions,
}: {
  user: { id: string; name: string; email: string; avatarUrl: string };
  actions: Action[];
}) => {
  const colorMap = {
    primary: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
    secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200",
    chat: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
  };

  return (
    <div className="flex items-center justify-between rounded-lg p-3 transition-colors duration-150 hover:bg-slate-50">
      <div className="flex min-w-0 items-center space-x-3">
        <Image
          src={user.avatarUrl}
          alt={`${user.name}'s profile`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {user.name}
          </p>
          <p className="truncate text-xs text-slate-500">{user.email}</p>
        </div>
      </div>
      <div className="ml-2 flex flex-shrink-0 space-x-3">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className={`flex cursor-pointer items-center space-x-1.5 rounded-md px-3 py-1 text-xs font-medium ${colorMap[action.variant]}`}
          >
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
