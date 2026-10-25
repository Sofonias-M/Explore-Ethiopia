import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { safeNextPath } from "@/lib/safe-next";
import { LoginForm } from "./_components/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

async function LoginContent({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = safeNextPath(rawNext);
  const session = await getSession();

  if (session?.user) {
    redirect(nextPath);
  }

  return <LoginForm callbackURL={nextPath} />;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
