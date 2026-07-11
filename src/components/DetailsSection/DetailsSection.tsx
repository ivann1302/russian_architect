import { useState } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./DetailsSection.module.scss";

export function DetailsSection() {
  const { items } = siteContent.detailsSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section className={styles.section} aria-labelledby="details-title">
      <div className={styles.inner}>
        <div className={styles.desktopExperience}>
          <div className={styles.panel}>
            <h2 className={styles.desktopTitle} id="details-title">
              Внимание к каждой детали
            </h2>

            <div className={styles.sideList} aria-label="Список деталей ремонта">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    className={`${styles.detailButton} ${isActive ? styles.detailButtonActive : ""}`}
                    type="button"
                    key={item.title}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                  >
                    <span className={styles.thumb}>
                      <img src={item.image.src} alt="" loading={index < 2 ? "eager" : "lazy"} decoding="async" />
                    </span>
                    <span className={styles.detailCopy}>
                      <span className={styles.cardTitle}>{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.previewColumn}>
            <figure className={styles.preview}>
              <img src={activeItem.image.src} alt={activeItem.image.alt} decoding="async" />
            </figure>
            <div className={styles.previewText}>
              <span className={styles.number}>{String(activeIndex + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.previewTitle}>{activeItem.title}</h3>
                <p className={styles.cardText}>{activeItem.text}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.mobileTitle}>Внимание к каждой детали</h2>
        <div className={styles.mobileSlider} aria-label="Детали ремонта">
          {items.map((item, index) => {
            return (
              <article className={styles.slide} key={item.title}>
                <figure className={styles.slideMedia}>
                  <img src={item.image.src} alt={item.image.alt} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
                </figure>
                <div className={styles.slideBody}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
