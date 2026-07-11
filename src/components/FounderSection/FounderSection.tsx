import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./FounderSection.module.scss";

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const nextProgress = 1 - (rect.top + rect.height * 0.35) / (viewport + rect.height * 0.35);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const textShift = `${(0.5 - progress) * 54}px`;
  const quoteShift = `${(progress - 0.5) * 38}px`;
  const photoShift = `${Math.cos(progress * Math.PI * 2 + Math.PI) * 100}px`;

  return (
    <section className={styles.section} ref={sectionRef} aria-labelledby="founder-title">
      <div className={styles.inner}>
        <figure className={styles.photo}>
          {siteContent.founderSection.image.src ? (
            <img
              src={siteContent.founderSection.image.src}
              alt={siteContent.founderSection.image.alt}
              style={{ "--mobile-photo-shift": photoShift } as CSSProperties}
            />
          ) : (
            <div className={styles.photoPlaceholder} aria-hidden="true">
              <span>RR</span>
            </div>
          )}
          <figcaption>
            <span>{siteContent.founderSection.name}</span>
            <span>{siteContent.founderSection.role}</span>
          </figcaption>
        </figure>

        <div className={styles.content}>
          <h2 className={styles.title} id="founder-title" style={{ transform: `translateY(${textShift})` }}>
            {siteContent.founderSection.title}
          </h2>
          <blockquote className={styles.quote} style={{ transform: `translateY(${quoteShift})` }}>
            {siteContent.founderSection.quote}
          </blockquote>
          <p className={styles.text}>{siteContent.founderSection.text}</p>
          <div className={styles.person}>
            <strong>{siteContent.founderSection.name}</strong>
            <span>{siteContent.founderSection.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
