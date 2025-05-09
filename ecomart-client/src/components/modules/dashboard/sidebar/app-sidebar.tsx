"use client";

import * as React from "react";
import {
  House,
  Loader,
  PackageCheck,
  ShoppingBag,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useUser } from "@/context/UserContext";
import BrandLogo from "@/components/shared/BrandLogo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const data =
    user?.role === "admin"
      ? {
          navMain: [
            {
              title: "Dashboard",
              url: "/admin/dashboard",
              icon: SquareTerminal,
              isActive: true,
            },
            {
              title: "User Management",
              url: "/admin/allUsers",
              icon: User,
            },
            {
              title: "Product Management",
              url: "/admin/allProducts",
              icon: ShoppingBag,
            },
            {
              title: "Manage Orders",
              url: "/admin/manage-orders",
              icon: PackageCheck,
            },
            {
              title: "Profile",
              url: "/admin/profile",
              icon: User,
            },
          ],
        }
      : {
          navMain: [
            {
              title: "Dashboard",
              url: "/user/dashboard",
              icon: House,
            },
            {
              title: "My Profile",
              url: "/user/profile",
              icon: User,
            },
            {
              title: "My Orders",
              url: "/user/my-orders",
              icon: PackageCheck,
            },
          ],
        };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <BrandLogo className="text-2xl" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
