"use client";

import { useContructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";

// One component per image, because useContructUrl is a hook and can't be called in a loop.
// The <img> is absolutely positioned so its natural size never influences the layout;
// the wrapper alone decides how big the cell is.
function GalleryImage({
  fileKey,
  alt,
  className,
}: {
  fileKey: string;
  alt: string;
  className?: string;
}) {
  const url = useContructUrl(fileKey);

  return (
    <div
      className={cn("group relative overflow-hidden rounded-3xl border border-border/40 bg-[#F0EBE1] shadow-sm", className)}
    >
      <img
        src={url}
        alt={alt}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function DestinationGallery({
  title,
  imageUrls,
}: {
  title: string;
  imageUrls: string[];
}) {
  const images = imageUrls.slice(0, 4);

  // 0 images: neutral placeholder block
  if (images.length === 0) {
    return <div className="h-72 w-full rounded-2xl bg-muted sm:h-[26rem]" />;
  }

  const [main, ...rest] = images;

  // 1 image: single wide hero
  if (rest.length === 0) {
    return (
      <GalleryImage
        fileKey={main}
        alt={title}
        className="h-72 w-full sm:h-[26rem]"
      />
    );
  }

  // 2 images: two equal halves
  // 3 images: main on the left, two stacked on the right
  // 4 images: main on the left, one wide image on top and two below on the right
  return (
    <div className="grid gap-3 sm:h-[29rem] sm:grid-cols-2 sm:grid-rows-1">
      <GalleryImage fileKey={main} alt={title} className="h-72 sm:h-auto" />

      <div
        className={cn(
          "grid gap-2",
          rest.length === 1 && "grid-cols-1",
          rest.length === 2 && "grid-cols-1 sm:grid-rows-2",
          rest.length === 3 && "grid-cols-2 sm:grid-rows-2",
        )}
      >
        {rest.map((key, i) => (
          <GalleryImage
            key={key}
            fileKey={key}
            alt={`${title} photo ${i + 2}`}
            className={cn(
              "h-40 sm:h-auto",
              rest.length === 3 && i === 0 && "col-span-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}
