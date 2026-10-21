import { LoginForm } from "./_components/LoginForm";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
