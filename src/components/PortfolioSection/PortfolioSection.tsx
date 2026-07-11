import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./PortfolioSection.module.scss";

export function PortfolioSection() {
  const [imageIndexes, setImageIndexes] = useState(() => siteContent.portfolio.items.map(() => 0));
  const viewportRef = useRef<HTMLDivElement>(null);
  const items = siteContent.portfolio.items;

  const scrollTrack = (direction: number) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const firstCard = viewport.querySelector<HTMLElement>("[data-portfolio-card]");
    const track = viewport.querySelector<HTMLElement>("[data-portfolio-track]");
    const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
    const step = firstCard ? firstCard.offsetWidth + gap : viewport.clientWidth * 0.8;

    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  const selectCardImage = (cardIndex: number, direction: number) => {
    setImageIndexes((current) =>
      current.map((imageIndex, index) => {
        if (index !== cardIndex) {
          return imageIndex;
        }

        return (imageIndex + direction + items[cardIndex].images.length) % items[cardIndex].images.length;
      }),
    );
  };

  return (
    <section className={styles.section} id="projects" aria-labelledby="portfolio-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="portfolio-title">
          {siteContent.portfolio.title}
        </h2>
        <div className={styles.headerControls} aria-label="Переключение ленты портфолио">
          <button className={styles.navButton} type="button" onClick={() => scrollTrack(-1)} aria-label="Прокрутить портфолио назад">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button className={styles.navButton} type="button" onClick={() => scrollTrack(1)} aria-label="Прокрутить портфолио вперёд">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track} data-portfolio-track>
          {items.map((item, index) => (
            <article className={styles.card} key={item.title} data-portfolio-card>
              <div className={styles.media}>
                <img src={item.images[imageIndexes[index]].src} alt={item.images[imageIndexes[index]].alt} />
                <button className={`${styles.arrow} ${styles.arrowPrev}`} type="button" onClick={() => selectCardImage(index, -1)} aria-label={`Предыдущее фото проекта ${item.title}`}>
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button className={`${styles.arrow} ${styles.arrowNext}`} type="button" onClick={() => selectCardImage(index, 1)} aria-label={`Следующее фото проекта ${item.title}`}>
                  <ArrowRight aria-hidden="true" />
                </button>
                <a className={styles.more} href="#contacts">
                  Подробнее
                </a>
              </div>

              <div className={styles.caption}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.meta}>
                  <span>{item.area}</span>
                  <span>{item.days}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
