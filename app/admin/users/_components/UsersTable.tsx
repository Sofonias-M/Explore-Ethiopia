"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Loader2,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { AdminUsersData } from "@/app/data/admin/admin-get-users";
import { updateUserRole } from "@/app/data/admin/update-user-role";
// import { deleteUser } from "@/app/data/admin/delete-user";
import { USER_ROLES, type UserRole } from "@/app/data/admin/roles";
import { deleteUser } from "@/app/data/admin/admin-delete-user";

const ROLE_STYLES: Record<UserRole, string> = {
  admin:
    "bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/20",
  guide:
    "bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20 dark:text-blue-400",
  user: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
};

function RoleBadge({ role }: { role: string }) {
  const normalized = (USER_ROLES as readonly string[]).includes(role)
    ? (role as UserRole)
    : "user";

  return (
    <Badge
      variant="outline"
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${ROLE_STYLES[normalized]}`}
    >
      {normalized === "admin" && <ShieldCheck size={12} className="mr-1" />}
      {normalized === "guide" && <BadgeCheck size={12} className="mr-1" />}
      {normalized}
    </Badge>
  );
}

function UserRow({
  user,
  currentUserId,
}: {
  user: AdminUsersData[number];
  currentUserId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isSelf = user.id === currentUserId;

  const handleRoleChange = (role: UserRole) => {
    if (role === user.role) return;

    startTransition(async () => {
      const result = await updateUserRole(user.id, role);
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser(user.id);
      if (result.status === "success") {
        toast.success(result.message);
        setDeleteOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback>
              {initials || <UserRound size={14} />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name || "Unnamed"}
              {isSelf && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  (you)
                </span>
              )}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <RoleBadge role={user.role} />
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {user.emailVerified ? (
          <span className="text-emerald-600 dark:text-emerald-400">
            Verified
          </span>
        ) : (
          "Unverified"
        )}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {user._count.trips}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {new Date(user.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Select
            value={user.role}
            onValueChange={(value) => handleRoleChange(value as UserRole)}
            disabled={isPending}
          >
            <SelectTrigger size="sm" className="w-28 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {USER_ROLES.map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                  disabled={isSelf && role !== "admin"}
                  className="capitalize"
                >
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                disabled={isSelf || isPending}
                aria-label={`Delete ${user.name}`}
              >
                {isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {user.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes their account, sessions and trips.
                  This can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function UsersTable({
  data,
  currentUserId,
}: {
  data: AdminUsersData;
  currentUserId: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">All users</h2>
          <p className="text-xs text-muted-foreground">
            {filtered.length} of {data.length} user
            {data.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email..."
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trips</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No users match “{query}”.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                currentUserId={currentUserId}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search Input Skeleton */}
      <Skeleton className="h-9 w-full sm:max-w-xs rounded-md" />

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-4 w-28" /></TableHead>
              <TableHead><Skeleton className="h-4 w-36" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-8 w-24 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="size-8 rounded-md ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

