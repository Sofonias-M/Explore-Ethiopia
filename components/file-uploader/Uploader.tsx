"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { useContructUrl } from "@/hooks/use-construct-url";
import { RenderEmptyState, RenderUploadedState } from "./RenderState";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB per image

interface PendingUpload {
  id: string;
  file: File;
  previewUrl: string;
  progress: number;
  error: boolean;
}

interface MultiImageUploaderProps {
  /** S3 keys of the images that are already uploaded */
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
  /** Lets the parent disable its submit button while uploads are running */
  onBusyChange?: (busy: boolean) => void;
}

function putToS3(
  presignedUrl: string,
  file: File,
  onProgress: (progress: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    // xhr.onload = () => {
    //   if (xhr.status === 200 || xhr.status === 204) resolve();
    //   else reject(new Error("Upload failed."));
    // };
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        resolve();
      } else {
        console.error("S3 upload failed:", xhr.status, xhr.responseText);
        reject(new Error("Upload failed."));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed."));

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}

function UploadedImage({
  fileKey,
  isDeleting,
  onRemove,
}: {
  fileKey: string;
  isDeleting: boolean;
  onRemove: () => void;
}) {
  // The hook can't be called in a loop, so each image gets its own component
  const url = useContructUrl(fileKey);

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
      <RenderUploadedState
        previewUrl={url}
        fileType="image"
        isDeleting={isDeleting}
        handleRemoveFile={onRemove}
      />
    </div>
  );
}

function PendingImage({
  item,
  onDismiss,
}: {
  item: PendingUpload;
  onDismiss: () => void;
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
      <img
        src={item.previewUrl}
        alt={item.file.name}
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
        {item.error ? (
          <span className="text-sm font-medium">Upload failed</span>
        ) : (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span className="mt-1 text-sm font-medium">{item.progress}%</span>
          </>
        )}
      </div>
      {item.error && (
        <Button
          variant="destructive"
          size="icon"
          type="button"
          aria-label="Dismiss failed upload"
          className="absolute right-4 top-4"
          onClick={onDismiss}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}

export function MultiImageUploader({
  value,
  onChange,
  max = 4,
  onBusyChange,
}: MultiImageUploaderProps) {
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [deleting, setDeleting] = useState<string[]>([]);

  // Keeps the latest list so several uploads finishing at once don't overwrite each other
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const pendingRef = useRef(pending);
  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  const uploadingCount = pending.filter((p) => !p.error).length;
  const slotsLeft = max - value.length - uploadingCount;

  useEffect(() => {
    onBusyChange?.(uploadingCount > 0);
  }, [uploadingCount, onBusyChange]);

  // Release preview blobs when the component unmounts
  useEffect(() => {
    return () => {
      pendingRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, []);

  const uploadFile = useCallback(
    async (item: PendingUpload) => {
      const patch = (changes: Partial<PendingUpload>) =>
        setPending((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, ...changes } : p)),
        );

      try {
        // 1. Get a presigned URL from the server
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: item.file.name,
            contentType: item.file.type,
            size: item.file.size,
            isImage: true,
          }),
        });

        if (!presignedResponse.ok) {
          throw new Error("Failed to get presigned URL");
        }

        const { presignedUrl, key } = await presignedResponse.json();

        // 2. Upload straight to the bucket
        await putToS3(presignedUrl, item.file, (progress) =>
          patch({ progress }),
        );

        // 3. Add the key to the form value and drop the pending tile
        const next = [...valueRef.current, key];
        valueRef.current = next;
        onChange(next);

        URL.revokeObjectURL(item.previewUrl);
        setPending((prev) => prev.filter((p) => p.id !== item.id));
      } catch {
        toast.error(`Failed to upload ${item.file.name}`);
        patch({ error: true, progress: 0 });
      }
    },
    [onChange],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const files = acceptedFiles.slice(0, Math.max(slotsLeft, 0));

      if (acceptedFiles.length > files.length) {
        toast.error(
          `You can add at most ${max} pictures. Extra files were skipped.`,
        );
      }

      const items: PendingUpload[] = files.map((file) => ({
        id: uuidv4(),
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        error: false,
      }));

      setPending((prev) => [...prev, ...items]);
      items.forEach(uploadFile);
    },
    [slotsLeft, max, uploadFile],
  );

  function rejectFiles(fileRejections: FileRejection[]) {
    const codes = fileRejections.flatMap((r) => r.errors.map((e) => e.code));

    if (codes.includes("file-too-large")) {
      toast.error("Each picture must be 5MB or smaller.");
    }
    if (codes.includes("file-invalid-type")) {
      toast.error("Only image files are allowed.");
    }
  }

  async function removeUploaded(key: string) {
    if (deleting.includes(key)) return;

    setDeleting((prev) => [...prev, key]);

    try {
      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!response.ok) {
        toast.error("Failed to delete picture");
        return;
      }

      const next = valueRef.current.filter((k) => k !== key);
      valueRef.current = next;
      onChange(next);

      toast.success("Picture removed");
    } catch {
      toast.error("Failed to remove picture");
    } finally {
      setDeleting((prev) => prev.filter((k) => k !== key));
    }
  }

  function removePending(id: string) {
    const item = pending.find((p) => p.id === id);
    if (item) URL.revokeObjectURL(item.previewUrl);
    setPending((prev) => prev.filter((p) => p.id !== id));
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectFiles,
    accept: { "image/*": [] },
    multiple: true,
    maxSize: MAX_SIZE,
    disabled: slotsLeft <= 0,
  });

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={cn(
          "relative h-48 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-solid border-primary bg-primary/10"
            : "border-border hover:border-primary",
          slotsLeft <= 0 && "pointer-events-none opacity-50",
        )}
      >
        <CardContent className="flex h-full w-full items-center justify-center p-4">
          <input {...getInputProps()} />
          <RenderEmptyState isDragActive={isDragActive} />
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        {value.length}/{max} pictures uploaded. Up to 5MB each.
      </p>

      {(value.length > 0 || pending.length > 0) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((key) => (
            <UploadedImage
              key={key}
              fileKey={key}
              isDeleting={deleting.includes(key)}
              onRemove={() => removeUploaded(key)}
            />
          ))}
          {pending.map((item) => (
            <PendingImage
              key={item.id}
              item={item}
              onDismiss={() => removePending(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
