"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton disabled={true}>
            <Skeleton className="size-6 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export const SubscriptionsSection = () => {
  const pathname = usePathname();
  const { data, isLoading } = trpc.subscriptions.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            data?.pages
              .flatMap((page) => page.items)
              .map((subscription) => (
                <SidebarMenuItem
                  key={`${subscription.creatorId}-${subscription.viewerId}`}
                >
                  <SidebarMenuButton
                    tooltip={subscription.user.name}
                    asChild={true}
                    isActive={pathname === `/users/${subscription.user.id}`}
                  >
                    <Link
                      prefetch
                      href={`/users/${subscription.user.id}`}
                      className="flex items-center gap-4"
                    >
                      <UserAvatar
                        size="xs"
                        imageUrl={subscription.user.imageUrl}
                        name={subscription.user.name}
                      />
                      <span className="text-sm">{subscription.user.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
          )}
          {!isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/subscriptions"}
                asChild
              >
                <Link
                  prefetch
                  href="/subscriptions"
                  className="flex items-center gap-4"
                >
                  <ListIcon className="size-4" />
                  <span className="text-sm">Subscriptions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
