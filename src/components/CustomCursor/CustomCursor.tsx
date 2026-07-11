import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.scss";

const interactiveSelector = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabled();
    desktopQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);

    return () => {
      desktopQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-enabled", isEnabled);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [isEnabled]);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || !isEnabled) {
      return;
    }

    let frameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setIsHovering(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);
    const handlePointerLeave = () => cursor.classList.add(styles.hidden);
    const handlePointerEnter = () => cursor.classList.remove(styles.hidden);

    frameId = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return <div ref={cursorRef} className={`${styles.cursor} ${isHovering ? styles.hovering : ""} ${isPressed ? styles.pressed : ""}`} aria-hidden="true" />;
}
