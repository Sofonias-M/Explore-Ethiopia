"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  locationCategories,
  locationSchema,
  type LocationFormValues,
  type LocationSchemaType,
} from "@/lib/zodSchema";
import { MultiImageUploader } from "@/components/file-uploader/Uploader";
import { tryCatch } from "@/hooks/try-catch";
// import { UpdateDestination } from "./action";
import type { AdminDestinationSingularData } from "@/app/data/admin/admin-get-destination";
import { UpdateDestination } from "./action";

const MAX_IMAGES = 4;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

// <input type="date"> wants "yyyy-MM-dd"
function toDateInputValue(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

// Prisma stores coordinates as Json — trust the shape but fall back to [] if it's ever malformed
function toCoordinates(value: unknown): { lat: number; lng: number }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (p): p is { lat: number; lng: number } =>
        typeof p === "object" &&
        p !== null &&
        typeof (p as Record<string, unknown>).lat === "number" &&
        typeof (p as Record<string, unknown>).lng === "number",
    )
    .map((p) => ({ lat: p.lat, lng: p.lng }));
}

export function EditDestinationForm({
  data,
}: {
  data: AdminDestinationSingularData;
}) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const form = useForm<LocationFormValues, unknown, LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      place: data.place,
      category: data.category,
      coordinates: toCoordinates(data.coordinates),
      imageUrls: data.imageUrls ?? [],
      startDate: toDateInputValue(data.startDate) as unknown as Date,
      durationDays: data.durationDays,
      price: Number(data.price),
      // tourGuideId isn't selected in adminGetDestination yet — add it to the
      // select there if you want existing guides to show up when editing.
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting, dirtyFields },
  } = form;

  const title = watch("title");
  const {
    fields: pins,
    append: appendPin,
    remove: removePin,
  } = useFieldArray({ control, name: "coordinates" });

  const imageUrls = watch("imageUrls") ?? [];

  const onSubmit = (values: LocationSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        UpdateDestination(data.id, values),
      );

      if (error) {
        toast.error("An unexpected error occured");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push("/admin/destinations");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Edit location</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update {data.title}&apos;s details, map pins and pictures.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* Basics */}
        <section className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Rock-hewn churches of Lalibela"
              className="mt-2"
              {...register("title", {
                onChange: (e) => {
                  if (!dirtyFields.slug) {
                    setValue("slug", slugify(e.target.value));
                  }
                },
              })}
            />
            <FieldError message={errors.title?.message} />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <div className="mt-2 flex gap-2">
              <Input
                id="slug"
                placeholder="rock-hewn-churches-of-lalibela"
                {...register("slug")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setValue("slug", slugify(getValues("title") ?? ""), {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                disabled={!title?.trim()}
              >
                <Sparkles size={14} />
                Generate
              </Button>
            </div>
            <FieldError message={errors.slug?.message} />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={6}
              placeholder="What will travelers see and do?"
              className="mt-2"
              {...register("description")}
            />
            <FieldError message={errors.description?.message} />
          </div>

          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Lalibela, Ethiopia"
              className="mt-2"
              {...register("place")}
            />
            <FieldError message={errors.place?.message} />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="mt-2 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              {...register("category")}
            >
              <option value="">Select a category</option>
              {locationCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FieldError message={errors.category?.message} />
          </div>
        </section>

        {/* Schedule & price */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="startDate">Start date</Label>
            <Input
              id="startDate"
              type="date"
              className="mt-2"
              {...register("startDate")}
            />
            <FieldError message={errors.startDate?.message} />
          </div>

          <div>
            <Label htmlFor="durationDays">Duration (days)</Label>
            <Input
              id="durationDays"
              type="number"
              min={1}
              placeholder="3"
              className="mt-2"
              {...register("durationDays")}
            />
            <FieldError message={errors.durationDays?.message} />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min={1}
              step="0.01"
              placeholder="12000"
              className="mt-2"
              {...register("price")}
            />
            <FieldError message={errors.price?.message} />
          </div>
        </section>

        {/* Map pins */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">Map pins</h2>
              <p className="text-xs text-muted-foreground">
                Latitude and longitude for each pin shown on the map.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPin({ lat: 0, lng: 0 })}
              disabled={pins.length >= 20}
            >
              <Plus size={14} />
              Add pin
            </Button>
          </div>

          {pins.map((pin, index) => (
            <div key={pin.id} className="flex items-start gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  step="any"
                  placeholder="Latitude (e.g. 12.0317)"
                  aria-label={`Pin ${index + 1} latitude`}
                  {...register(`coordinates.${index}.lat`, {
                    valueAsNumber: true,
                  })}
                />
                <FieldError
                  message={errors.coordinates?.[index]?.lat?.message}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  step="any"
                  placeholder="Longitude (e.g. 39.0410)"
                  aria-label={`Pin ${index + 1} longitude`}
                  {...register(`coordinates.${index}.lng`, {
                    valueAsNumber: true,
                  })}
                />
                <FieldError
                  message={errors.coordinates?.[index]?.lng?.message}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove pin ${index + 1}`}
                onClick={() => removePin(index)}
                disabled={pins.length === 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          <FieldError
            message={
              errors.coordinates?.message ?? errors.coordinates?.root?.message
            }
          />
        </section>

        {/* Pictures */}
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-medium">
              Pictures ({imageUrls.length}/{MAX_IMAGES})
            </h2>
          </div>
          <Controller
            control={control}
            name="imageUrls"
            render={({ field }) => (
              <MultiImageUploader
                value={field.value ?? []}
                onChange={field.onChange}
                max={MAX_IMAGES}
                onBusyChange={setUploading}
              />
            )}
          />
          <FieldError message={errors.imageUrls?.message} />
        </section>

        {/* Extras */}
        <section className="space-y-4">
          <div>
            <Label htmlFor="tourGuideId">Tour guide (user ID, optional)</Label>
            <Input
              id="tourGuideId"
              className="mt-2"
              {...register("tourGuideId", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
            />
            <FieldError message={errors.tourGuideId?.message} />
          </div>
        </section>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/destinations")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isPending || uploading}
          >
            {isSubmitting || isPending ? (
              <>
                Saving... <Loader2 className="ml-1 animate-spin" />
              </>
            ) : (
              <span>Save changes</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
