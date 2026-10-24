"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteDestination } from "@/actions/destination-actions";

type DeleteDestinationButtonProps = {
destinationId: string;
destinationName: string;
};

export default function DeleteDestinationButton({
destinationId,
destinationName,
}: DeleteDestinationButtonProps) {
const router = useRouter();
const [isPending, startTransition] = useTransition();
const [error, setError] = useState("");

function handleDelete() {
const confirmed = window.confirm(
`Are you sure you want to delete "${destinationName}"? This action cannot be undone.`,
);

if (!confirmed) {
  return;
}

setError("");

startTransition(async () => {
  const result = await deleteDestination(destinationId);

  if (!result.success) {
    setError(result.message);
    return;
  }

  router.refresh();
});
}

return ( <div className="flex flex-col items-start gap-2">
<button
type="button"
onClick={handleDelete}
disabled={isPending}
aria-label={`Delete ${destinationName}`}
className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
> <Trash2 size={15} />
{isPending ? "Deleting..." : "Delete"} </button>

  {error && (
    <p className="max-w-xs text-sm text-red-700" role="alert">
      {error}
    </p>
  )}
</div>
);
}
