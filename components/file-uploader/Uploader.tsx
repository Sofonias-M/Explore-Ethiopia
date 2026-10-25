"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { RenderEmptyState } from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image";
}

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
  fileTypeAccepted: "image";
}

export default function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    // key: value,
    // objectUrl: value ? fileUrl : undefined,
  });

  function uploadFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      // console.log(acceptedFiles);
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl?.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });

        // uploadFile(file);
      }
    },
    [fileState.objectUrl],
  );

  function rejectFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizeTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error("Too many files selected, max is 1");
      }
      if (fileSizeTooBig) {
        toast.error("File size too big.");
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    accept: { "image/*": [] },
    maxFiles: 4,
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5mb
    onDropRejected: rejectFiles,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/30 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      <RenderEmptyState isDragActive={isDragActive} />
    </div>
  );
}
