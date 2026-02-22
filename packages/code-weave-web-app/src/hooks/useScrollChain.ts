import { useEffect, useRef } from "react";

/**
 * Returns a ref that should be attached to any scrollable container.
 * Wheel events will bubble to window if scroll is at top/bottom.
 */
export const useScrollChain = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault(); // prevent inner container from absorbing
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
      // otherwise let the inner container scroll normally
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return containerRef;
};
