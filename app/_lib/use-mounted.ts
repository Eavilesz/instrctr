import { useEffect, useState } from "react";

/** True only after the client has mounted. Use to defer locale/timezone-dependent
 * rendering (e.g. date formatting) so the SSR output matches first client paint. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
