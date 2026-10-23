import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export async function requireAdmin() {
  const session = await getSession();

  // The user must be signed in.
  if (!session?.user) {
    redirect("/login");
  }

  // Temporary administrator check.
  // We will integrate the project's shared role-based
  // authorization when that implementation is available.
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = session.user.email?.trim().toLowerCase();

  if (!userEmail || !adminEmails.includes(userEmail)) {
    redirect("/");
  }

  return session.user;
}