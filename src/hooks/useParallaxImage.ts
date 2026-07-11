import { useEffect, useRef } from "react";

type ParallaxOptions = {
  strength?: number;
};

export function useParallaxImage<T extends HTMLElement>({ strength = 34 }: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2 + rect.height / 2);
      const clampedProgress = Math.max(-1, Math.min(1, progress));

      element.style.setProperty("--parallax-y", `${clampedProgress * strength}px`);
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      element.style.removeProperty("--parallax-y");
    };
  }, [strength]);

  return ref;
}
