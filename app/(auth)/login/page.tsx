import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { LoginForm } from "./_components/LoginForm";
// import { LoginForm } from "./_components/loginform";

async function LoginContent() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
