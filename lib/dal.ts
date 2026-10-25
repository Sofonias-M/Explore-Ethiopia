import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

/**
 * The current project uses ADMIN_EMAILS as its administrator allowlist.
 * Keep this policy centralized until the team explicitly adopts database roles.
 */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.trim().toLowerCase());
}

export async function isAdminAuthorized(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session?.user?.id && isAdminEmail(session.user.email));
}

export async function requireUser() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  return user;
}
