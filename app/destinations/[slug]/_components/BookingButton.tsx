"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { bookDestination } from "../action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function BookingButton({ locationId }: { locationId: string }) {
  const [isPending, startTransition] = useTransition();
  function onSubmit() {
    console.log("hiiiii");
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        bookDestination(locationId),
      );
      console.log("here, ", result);
      console.error("here 2 ", error);
      if (error) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          return;
        }
        // console.log("error", error);
        toast.error("Failed to book destination");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <Button
      onClick={onSubmit}
      disabled={isPending}
      // className="w-full cursor-pointer "
      // className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
      className="mt-6 w-full rounded-full bg-brand py-5 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Book Now!"
      )}
    </Button>
  );
}
