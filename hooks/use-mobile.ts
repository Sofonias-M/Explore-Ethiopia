import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(MEDIA_QUERY);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia(MEDIA_QUERY).matches,
    () => false
  );
}
