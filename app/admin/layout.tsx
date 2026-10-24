import { Suspense, type ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import AdminNavigation from "@/components/admin/admin-navigation";

type AdminLayoutProps = {
  children: ReactNode;
};

async function ProtectedAdminLayout({
  children,
}: AdminLayoutProps) {
  // Verify the user's session and administrator permissions
  // on the server before rendering the protected interface.
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <AdminNavigation />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}

function AdminLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-gray-600">
        Loading administration...
      </p>
    </div>
  );
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <ProtectedAdminLayout>
        {children}
      </ProtectedAdminLayout>
    </Suspense>
  );
}