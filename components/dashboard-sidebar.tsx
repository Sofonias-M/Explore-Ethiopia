"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck2,
  CalendarDays,
  Compass,
  Globe,
  Home,
  MapPin,
  Sparkles,
  Ticket,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "My Bookings",
    url: "/dashboard",
    icon: CalendarCheck2,
    badge: null,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: CalendarDays,
    badge: "Full View",
  },
  {
    title: "Back to Home",
    url: "/",
    icon: Globe,
    badge: null,
  },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/dashboard" />}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold tracking-tight text-foreground">
                  Explore Ethiopia
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Traveler Portal
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 pt-2">
              Navigation
            </SidebarGroupLabel>

            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      className={
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }
                      render={<Link href={item.url} />}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5">
                          <item.icon className="size-4.5" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
