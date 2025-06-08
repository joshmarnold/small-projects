"use client";

import { useAppStore } from "@/store/useAppStore";
import { UserCardGroup } from "./UserCardGroup";
import { UserRow } from "./UserRow";
import { motion } from "framer-motion";

import {
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { parentMotionProps } from "@/constants/motion";

export const Connections = () => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const users = useAppStore((s) => s.users);
  const currentUser = users.find((u) => u.id === currentUserId)!;
  const followUser = useAppStore((s) => s.followUser);
  const unfollowUser = useAppStore((s) => s.unfollowUser);

  const following = users.filter((u) => currentUser.following.includes(u.id));
  const followers = users.filter((u) => currentUser.followers.includes(u.id));
  const discover = users.filter(
    (u) => u.id !== currentUserId && !currentUser.following.includes(u.id),
  );

  return (
    <motion.div
      {...parentMotionProps}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Following */}
      <UserCardGroup title={`Following (${following.length})`}>
        {following.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            actions={[
              {
                label: (
                  <div className="flex items-center">
                    <UserMinusIcon className="mr-1 h-4 w-4" />
                    Unfollow
                  </div>
                ),
                variant: "secondary",
                onClick: () => unfollowUser(user.id),
              },
              {
                label: (
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="mr-1 h-4 w-4" />
                    Chat
                  </div>
                ),
                variant: "chat",
                onClick: () => console.log("Start chat with", user.name),
              },
            ]}
          />
        ))}
      </UserCardGroup>

      {/* Followers */}
      <UserCardGroup title={`Followers (${followers.length})`}>
        {followers.map((user) => {
          const isFollowedBack = currentUser.following.includes(user.id);
          return (
            <UserRow
              key={user.id}
              user={user}
              actions={[
                !isFollowedBack
                  ? {
                      label: (
                        <div className="flex items-center">
                          <UserPlusIcon className="mr-1 h-4 w-4" />
                          Follow
                        </div>
                      ),
                      variant: "primary" as const,
                      onClick: () => followUser(user.id),
                    }
                  : {
                      label: (
                        <div className="flex items-center">
                          <UserMinusIcon className="mr-1 h-4 w-4" />
                          Unfollow
                        </div>
                      ),
                      variant: "secondary" as const,
                      onClick: () => unfollowUser(user.id),
                    },
                {
                  label: (
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="mr-1 h-4 w-4" />
                      Chat
                    </div>
                  ),
                  variant: "chat" as const,
                  onClick: () => console.log("Start chat with", user.name),
                },
              ].filter(Boolean)}
            />
          );
        })}
      </UserCardGroup>

      {/* Find People */}
      <div className="md:col-span-2">
        <UserCardGroup title="Find People">
          {discover.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              actions={[
                {
                  label: (
                    <div className="flex items-center">
                      <UserPlusIcon className="mr-1 h-4 w-4" />
                      Follow
                    </div>
                  ),
                  variant: "primary",
                  onClick: () => followUser(user.id),
                },
                {
                  label: (
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="mr-1 h-4 w-4" />
                      Chat
                    </div>
                  ),
                  variant: "chat",
                  onClick: () => console.log("Start chat with", user.name),
                },
              ]}
            />
          ))}
        </UserCardGroup>
      </div>
    </motion.div>
  );
};
