"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  courseCategories,
  locationSchema,
  type LocationFormValues,
  type LocationSchemaType,
} from "@/lib/zodSchema";
import Uploader from "@/components/file-uploader/Uploader";

const MAX_IMAGES = 4;

// Blank pin row. Cast because the inputs start empty and are converted to numbers on submit.
const emptyPin = { lat: "", lng: "" } as unknown as {
  lat: number;
  lng: number;
};

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

export default function LocationCreationPage() {
  const [imageInput, setImageInput] = useState("");
  const [imageError, setImageError] = useState("");

  const form = useForm<LocationFormValues, unknown, LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      place: "",
      coordinates: [emptyPin],
      imageUrls: [],
      //   currency: "ETB",
      //   isPublished: true,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = form;

  const title = watch("title");
  const {
    fields: pins,
    append: appendPin,
    remove: removePin,
  } = useFieldArray({ control, name: "coordinates" });

  const imageUrls = watch("imageUrls") ?? [];

  const addImage = () => {
    const url = imageInput.trim();
    setImageError("");

    try {
      new URL(url);
    } catch {
      setImageError("Enter a valid image URL");
      return;
    }
    if (imageUrls.length >= MAX_IMAGES) {
      setImageError(`You can add at most ${MAX_IMAGES} pictures`);
      return;
    }
    if (imageUrls.includes(url)) {
      setImageError("That picture is already added");
      return;
    }

    setValue("imageUrls", [...imageUrls, url], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setImageInput("");
  };

  const removeImage = (url: string) => {
    setValue(
      "imageUrls",
      imageUrls.filter((u) => u !== url),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const onSubmit = async (values: LocationSchemaType) => {
    console.log("Location payload:", values);
    toast.success("Form is valid. Backend isn't connected yet.");
    reset();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create location
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a bookable tour with its dates, price, map pins and pictures.
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
                // Auto-fill the slug until the user edits it manually
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
              {courseCategories.map((category) => (
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

          {/* <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              maxLength={3}
              className="mt-2 uppercase"
              {...register("currency")}
            />
            <FieldError message={errors.currency?.message} />
          </div> */}
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
              onClick={() => appendPin(emptyPin)}
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
            <p className="text-xs text-muted-foreground">
              Paste image URLs for now.
            </p>
          </div>
          <Uploader />
          {/* 

          <div className="flex gap-2">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage();
                }
              }}
              placeholder="https://..."
              aria-label="Image URL"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addImage}
              disabled={imageUrls.length >= MAX_IMAGES}
            >
              Add
            </Button>
          </div>
          <FieldError message={imageError || errors.imageUrls?.message} />

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {imageUrls.map((url) => (
                <div
                  key={url}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
                >
                  <img
                    src={url}
                    alt="Location preview"
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove picture"
                    onClick={() => removeImage(url)}
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )} */}
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

          {/* <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-current"
              {...register("isPublished")}
            />
            Publish immediately
          </label> */}
        </section>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create location"}
          </Button>
        </div>
      </form>
    </div>
  );
}
