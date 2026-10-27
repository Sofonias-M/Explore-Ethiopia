import { Suspense } from "react";
import { adminGetDestination } from "@/app/data/admin/admin-get-destination";
import { EditDestinationForm } from "./EditDestinationForm";

type Params = Promise<{ id: string }>;

async function EditContent({ params }: { params: Params }) {
  const { id } = await params;
  const data = await adminGetDestination(id);

  return <EditDestinationForm data={data} />;
}

export default function EditRoute({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }
    >
      <EditContent params={params} />
    </Suspense>
  );
}
