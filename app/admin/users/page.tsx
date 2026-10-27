import { Suspense } from "react";
import { adminGetUsers } from "@/app/data/admin/admin-get-users";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { UsersTable, UsersTableSkeleton } from "./_components/UsersTable";

async function UsersContent() {
  const session = await requireAdmin();
  const data = await adminGetUsers();

  return <UsersTable data={data} currentUserId={session.user.id} />;
}

export default function UsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Users</h1>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}

