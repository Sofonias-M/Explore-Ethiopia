// import { requireAdmin } from "@/app/data/admin/require-admin";
// import { requireUser } from "@/app/data/user/require-user";
import { S3 } from "@/lib/S3Client";
// import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
// import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const fileUploadSchema = z.object({
  fileName: z
    .string()
    .min(1, {
      message: "File name is required",
    })
    .max(255),
  contentType: z
    .string()
    .min(1, {
      message: "Content type is required",
    })
    .max(100),
  size: z.number().min(1, {
    message: "File size must be greater than 0",
  }),
  //   isImage: z.boolean(),
});

export async function POST(request: Request) {
  // const session = await requireAdmin();
  try {
    const body = await request.json();

    const validation = fileUploadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { fileName, contentType, size } = validation.data;

    const unique = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: unique,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 360 });

    const response = {
      presignedUrl,
      key: unique,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 },
    );
  }
}
