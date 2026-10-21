"use client";

import { ThemeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };
  return (
    <>
      <h1>Hello, world!</h1>
      {mounted && (
        <ThemeToggleButton
          theme={theme === "light" ? "light" : "dark"}
          variant="circle"
          onClick={toggleTheme}
        />
      )}
    </>
  );
}
