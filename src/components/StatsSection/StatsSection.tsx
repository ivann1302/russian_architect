import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./StatsSection.module.scss";

export function StatsSection() {
  const { image, items } = siteContent.stats;
  const panelRef = useRef<HTMLDivElement>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      setIsPanelVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPanelVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(panel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Русский Зодчий в цифрах">
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image.src} alt={image.alt} loading="lazy" />
      </div>

      <div ref={panelRef} className={`${styles.statsPanel} ${isPanelVisible ? styles.statsPanelVisible : ""}`}>
        <div className={styles.list}>
          {items.map((item) => {
            return (
              <div className={styles.item} key={item.label}>
                <strong className={styles.value}>{item.value}</strong>
                <span className={styles.label}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
