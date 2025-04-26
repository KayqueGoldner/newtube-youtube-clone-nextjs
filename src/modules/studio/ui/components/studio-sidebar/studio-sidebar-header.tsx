"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import {
  SidebarHeader,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const StudioSidebarHeader = () => {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user) {
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-28 rounded-full" />
        <div className="mt-2 flex flex-col items-center gap-y-2">
          <Skeleton className="size-20 h-4" />
          <Skeleton className="size-[100px] h-4" />
        </div>
      </SidebarHeader>
    );
  }

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Your profile">
          <Link prefetch href="/users/current">
            <UserAvatar
              imageUrl={user.imageUrl}
              name={user.fullName ?? "User"}
              size="xs"
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link prefetch href="/users/current">
        <UserAvatar
          imageUrl={user.imageUrl}
          name={user.fullName ?? "User"}
          className="size-28 transition-opacity hover:opacity-80"
        />
      </Link>
      <div className="mt-2 flex flex-col items-center gap-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <p className="text-xs text-muted-foreground">{user.fullName}</p>
      </div>
    </SidebarHeader>
  );
};
