import { siteContent } from "@/data/siteContent";
import { useParallaxImage } from "@/hooks/useParallaxImage";
import styles from "./ServicesSection.module.scss";

export function ServicesSection() {
  const imageRef = useParallaxImage<HTMLImageElement>({ strength: 38 });

  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title} id="services-title">
            {siteContent.servicesSection.title}
          </h2>
          <p className={styles.text}>{siteContent.servicesSection.text}</p>
        </div>

        <div className={styles.body}>
          <figure className={styles.media}>
            <img ref={imageRef} className={styles.parallaxImage} src={siteContent.servicesSection.image.src} alt={siteContent.servicesSection.image.alt} />
          </figure>

          <div className={styles.list}>
            {siteContent.servicesSection.items.map((item, index) => (
              <article className={styles.item} key={item.title}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
