"use client";

import { GoogleIcon } from "@/components/custom/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type LoginFormProps = {
  callbackURL: string;
};

export function LoginForm({ callbackURL }: LoginFormProps) {
  const [googlePending, startGoogleTransition] = useTransition();

  async function signinWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
        fetchOptions: {
          onSuccess: () => {
            // console.log("Successfully signed in with Google");
            // toast.success("Successfully signed in with Google");
          },
          onError: (error) => {
            console.log(error);
            toast.error("Internal Server Error", { position: "top-center" });
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your Google</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={googlePending}
          onClick={signinWithGoogle}
          className="w-full"
          variant="outline"
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GoogleIcon />
              Sign in with Google
            </>
          )}
        </Button>

      </CardContent>
    </Card>
  );
}
