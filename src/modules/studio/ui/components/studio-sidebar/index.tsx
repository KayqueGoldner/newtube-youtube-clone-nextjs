"use client";

import Link from "next/link";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="z-40 pt-16" collapsible="icon">
      <SidebarContent className="bg-background">
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            <StudioSidebarHeader />
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/studio"}
                tooltip="Exit studio"
                asChild
              >
                <Link prefetch href="/studio">
                  <VideoIcon className="size-5" />
                  <span className="text-sm">Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Exit studio" asChild>
                <Link prefetch href="/">
                  <LogOutIcon className="size-5" />
                  <span className="text-sm">Exit studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
