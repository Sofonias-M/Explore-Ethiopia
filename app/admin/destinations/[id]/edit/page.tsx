import { Suspense } from "react";
import { adminGetDestination } from "@/app/data/admin/admin-get-destination";
import { EditDestinationForm } from "./EditDestinationForm";
import { Skeleton } from "@/components/ui/skeleton";

type Params = Promise<{ id: string }>;

async function EditContent({ params }: { params: Params }) {
  const { id } = await params;
  const data = await adminGetDestination(id);

  return <EditDestinationForm data={data} />;
}

function DestinationEditSkeleton() {
  return (
    <div className="mx-auto max-w-2xl py-8 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="space-y-5 rounded-2xl border p-6 bg-card">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-28 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>

        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  );
}

export default function EditRoute({ params }: { params: Params }) {
  return (
    <Suspense fallback={<DestinationEditSkeleton />}>
      <EditContent params={params} />
    </Suspense>
  );
}

