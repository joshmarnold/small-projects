"use client";

import { useAppStore } from "@/store/";
import { Header } from "@/components/header/Header";
import { Feed } from "@/components/feed/Feed";
import { Groups } from "@/components/groups/Groups";
import { Messages } from "@/components/messages/Messages";
import { Connections } from "@/components/connections/Connections";
import { Notifications } from "@/components/notifications/Notifications";
import { Profile } from "@/components/profile/Profile";

export const AppShell = () => {
  const activeTab = useAppStore((s) => s.activeTab);

  const tabContent = {
    feed: <Feed />,
    groups: <Groups />,
    messages: <Messages />,
    connections: <Connections />,
    notifications: <Notifications />,
    profile: <Profile />,
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 pb-20 sm:px-6 sm:py-8 sm:pb-8 lg:px-8">
        {tabContent[activeTab]}
      </main>
    </>
  );
};
