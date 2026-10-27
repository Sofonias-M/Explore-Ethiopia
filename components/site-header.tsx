"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <div className="ml-auto flex items-center gap-2">
          {mounted && (
            <ThemeToggleButton
              theme={theme === "light" ? "light" : "dark"}
              variant="circle"
              onClick={toggleTheme}
            />
          )}
        </div>
      </div>
    </header>
  );
}
