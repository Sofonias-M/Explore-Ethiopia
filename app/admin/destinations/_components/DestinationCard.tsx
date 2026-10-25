"use client";

import { ArrowUpRight, Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { useContructUrl } from "@/hooks/use-construct-url";
// import { deleteDestination } from "@/app/data/admin/delete-destination"; // adjust to wherever you put this
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
import { deleteDestination } from "@/app/data/admin/admin-delete-destination";

type Destination = {
  id: string;
  slug: string;
  title: string;
  place: string;
  category: string;
  imageUrls: string[];
};

export function DestinationCard({ destination }: { destination: Destination }) {
  const url = useContructUrl(destination.imageUrls[0]);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteDestination(destination.id);

      if (result.status === "success") {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-muted">
      <img
        src={url}
        alt={destination.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Two-sided gradient: darkens both the top (badge/delete button) and bottom (text)
          regardless of how light or dark the photo itself is. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white ring-1 ring-inset ring-white/15 backdrop-blur-md">
        {destination.category}
      </span>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <button
            type="button"
            aria-label={`Delete ${destination.title}`}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-inset ring-white/15 backdrop-blur-md transition hover:bg-destructive"
          >
            <Trash2 size={14} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {destination.title}?</AlertDialogTitle>
            <AlertDialogDescription>
              This can't be undone. The destination will be removed from the
              site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
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

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
        <div>
          <p className="mb-2 text-[10px] text-white/75">{destination.place}</p>
          <h3 className="text-2xl font-medium tracking-tight">
            {destination.title}
          </h3>
        </div>
        <a
          href={`/admin/destinations/${destination.slug}`}
          aria-label={`Explore ${destination.slug}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-brand"
        >
          <ArrowUpRight size={19} />
        </a>
      </div>
    </article>
  );
}
