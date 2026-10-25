import { adminGetUsers } from "@/app/data/admin/admin-get-users";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { UsersTable } from "./_components/UsersTable";

export default async function UsersPage() {
  const session = await requireAdmin();
  const data = await adminGetUsers();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Users</h1>
      <UsersTable data={data} currentUserId={session.user.id} />
    </div>
  );
}
