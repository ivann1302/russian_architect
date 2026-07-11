import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";
import styles from "./ContactsSection.module.scss";

const yandexMapEmbedUrl =
  "https://yandex.ru/map-widget/v1/?ll=37.572890%2C55.758220&mode=search&oid=159384154953&ol=biz&z=16";
const address = "Москва, переулок Капранова, 3, стр. 3";

export function ContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { contacts } = siteContent;
  const phoneHref = `tel:+7${contacts.phone.replace(/\D/g, "").replace(/^8/, "")}`;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const nextProgress = 1 - (rect.top + rect.height * 0.3) / (viewport + rect.height * 0.3);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const handleScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const contentShift = `${(0.5 - progress) * 56}px`;

  return (
    <section className={styles.section} id="contacts" ref={sectionRef} aria-labelledby="contacts-title">
      <div className={styles.inner}>
        <div className={styles.map} aria-label="Карта Русский Зодчий на Яндекс Картах">
          <iframe src={yandexMapEmbedUrl} title="Русский Зодчий на Яндекс Картах" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className={styles.content} style={{ transform: `translateY(${contentShift})` }}>
          <h2 className={styles.title} id="contacts-title">
            Контакты
          </h2>

          <div className={styles.contactsBox}>
            <div className={styles.contactItem}>
              <strong>{address}</strong>
            </div>

            <div className={styles.contactItem}>
              <a href={phoneHref}>{contacts.phoneLabel}</a>
            </div>

            <div className={styles.contactItem}>
              <a href={contacts.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </div>

            <div className={styles.contactItem}>
              <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>

            <div className={styles.contactItem}>
              <a href={contacts.max} target="_blank" rel="noreferrer">
                Max
              </a>
            </div>

            <div className={styles.contactItem}>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </div>
          </div>

          <div className={styles.action}>
            <Button href={contacts.telegram} variant="green" size="lg">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
