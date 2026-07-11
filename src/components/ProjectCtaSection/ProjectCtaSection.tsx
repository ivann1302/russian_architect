import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";
import { withBase } from "@/utils/paths";
import styles from "./ProjectCtaSection.module.scss";

export function ProjectCtaSection() {
  return (
    <section className={styles.section} aria-labelledby="project-cta-title">
      <div className={styles.inner}>
        <div className={styles.sheetWrap} aria-hidden="true">
          <img className={styles.sheetImage} src={withBase("/assets/cta/project-sheet-cutout.png")} alt="" loading="lazy" />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title} id="project-cta-title">
            Обсудим ваш проект?
          </h2>
          <p className={styles.text}>
            Расскажем, какие решения подойдут именно вам, рассчитаем примерный бюджет и предложим стратегию реализации.
          </p>
          <Button href={siteContent.contacts.telegram} variant="light" size="lg" className={styles.button}>
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
}
