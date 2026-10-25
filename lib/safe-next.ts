const INTERNAL_ORIGIN = "https://explore-ethiopia.invalid";

/**
 * Accept only same-site absolute-path redirects such as /dashboard.
 * Unsafe, malformed, external, or ambiguous values fall back to "/".
 */
export function safeNextPath(value?: string | null): string {
  if (
    !value ||
    value !== value.trim() ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return "/";
  }

  try {
    const target = new URL(value, INTERNAL_ORIGIN);
    if (target.origin !== INTERNAL_ORIGIN) return "/";
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return "/";
  }
}
