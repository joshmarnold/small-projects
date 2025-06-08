"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { seedData } from "@/utils/seed";

export const useSeedData = () => {
  const set = useAppStore((state) => state);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (set.users.length === 0) {
      set.users = seedData.users;
      set.posts = seedData.posts;
      set.groups = seedData.groups;
      set.directMessages = seedData.directMessages;
      set.notifications = seedData.notifications;
    }
    setReady(true);
  }, [set]);

  return ready;
};
