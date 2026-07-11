import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./ReviewsSection.module.scss";

export function ReviewsSection() {
  const { title, items } = siteContent.reviewsSection;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState<(typeof items)[number] | null>(null);

  useEffect(() => {
    if (!activeReview) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveReview(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeReview]);

  const scrollReviews = (direction: number) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const firstCard = scroller.querySelector<HTMLElement>("[data-review-card]");
    const track = scroller.querySelector<HTMLElement>("[data-review-track]");
    const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
    const step = firstCard ? firstCard.offsetWidth + gap : scroller.clientWidth * 0.8;

    scroller.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title} id="reviews-title">
              {title}
            </h2>
          </div>
          <div className={styles.headerControls} aria-label="Переключение отзывов">
            <button className={styles.navButton} type="button" onClick={() => scrollReviews(-1)} aria-label="Прокрутить отзывы назад">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button className={styles.navButton} type="button" onClick={() => scrollReviews(1)} aria-label="Прокрутить отзывы вперёд">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className={styles.scroller} ref={scrollerRef} aria-label="Отзывы клиентов">
          <div className={styles.track} data-review-track>
            {items.map((review, index) => (
              <button className={styles.card} key={review.src} type="button" onClick={() => setActiveReview(review)} data-review-card aria-label="Открыть отзыв крупнее">
                <img className={styles.image} src={review.src} alt={review.alt} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <p className={styles.moreText}>
          <a href="https://yandex.ru/maps/org/russkiy_zodchiy/159384154953/reviews/?ll=37.572890%2C55.758220&z=16" target="_blank" rel="noreferrer">
            Смотреть больше отзывов
          </a>
        </p>
      </div>

      {activeReview ? (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Отзыв клиента" onClick={() => setActiveReview(null)}>
          <button className={styles.modalClose} type="button" onClick={() => setActiveReview(null)} aria-label="Закрыть отзыв">
            <X aria-hidden="true" />
          </button>
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <img className={styles.modalImage} src={activeReview.src} alt={activeReview.alt} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
