import { siteContent } from "@/data/siteContent";
import styles from "./ApproachSection.module.scss";

export function ApproachSection() {
  return (
    <section className={styles.section} aria-labelledby="approach-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="approach-title">
            {siteContent.approach.title}
          </h2>
          <p className={styles.text}>{siteContent.approach.text}</p>
        </div>

        <div className={styles.grid}>
          {siteContent.approach.items.map((item, index) => (
            <article className={styles.item} key={item.title}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
