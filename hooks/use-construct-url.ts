// export function useContructUrl(key: string | null | undefined): string {
//   if (!key) return "";
//   return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${key}`;
// }

export function useContructUrl(key: string | null | undefined): string {
  if (!key) return "";

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES;

  if (!bucket) return "";

  return `https://${bucket}.t3.tigrisfiles.io/${key}`;
}
