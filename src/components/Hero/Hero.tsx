import { useEffect, useState } from "react";
import { ArrowDownRight, MessageCircle } from "lucide-react";
import { CalculatorSection } from "@/components/CalculatorSection";
import { HeroBenefitsSection } from "@/components/HeroBenefitsSection";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";
import styles from "./Hero.module.scss";

export function Hero() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }

    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;
      const nextOffset = Math.min(90, Math.max(0, window.scrollY * 0.16));
      setParallaxOffset(nextOffset);
    };

    const handleScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title" style={{ "--hero-parallax": `${parallaxOffset}px` } as React.CSSProperties}>
      <div className={styles.media} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.label}>{siteContent.hero.label}</p>
          <h1 className={styles.title} id="hero-title">
            {siteContent.hero.title}
          </h1>
          <p className={styles.text}>{siteContent.hero.text}</p>
          <div className={styles.actions}>
            <Button href={siteContent.contacts.telegram} variant="gold" size="lg" iconLeft={<MessageCircle aria-hidden="true" />}>
              {siteContent.hero.primaryCta}
            </Button>
            <Button href="#projects" variant="outlineLight" size="lg" iconRight={<ArrowDownRight aria-hidden="true" />}>
              {siteContent.hero.secondaryCta}
            </Button>
          </div>
        </div>
        <div className={styles.mobileBenefits}>
          <HeroBenefitsSection placement="mobile" />
        </div>
        <div className={styles.calculator}>
          <CalculatorSection variant="hero" />
        </div>
      </div>
    </section>
  );
}
