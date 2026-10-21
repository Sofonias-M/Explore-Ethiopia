"use client";

import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type HomeClientProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export default function HomeClient({ user }: HomeClientProps) {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to log out");
          },
        },
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <main className="flex min-h-screen items-start justify-between p-6">
      <div className="flex items-center gap-3">
        {user.image ? (
          <img
            src={user.image}
            alt={`${user.name}'s Google profile`}
            referrerPolicy="no-referrer"
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-5" />
          </div>
        )}

        <div>
          <h1 className="font-semibold">Welcome, {user.name || "there"}!</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <ThemeToggleButton
            theme={theme === "light" ? "light" : "dark"}
            variant="circle"
            onClick={toggleTheme}
          />
        )}

        <Button onClick={handleLogout} disabled={loggingOut}>
          <LogOut className="mr-2 size-4" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </main>
  );
}
