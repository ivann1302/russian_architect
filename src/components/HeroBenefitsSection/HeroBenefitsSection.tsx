import { ClipboardCheck, GraduationCap, ShieldCheck, WalletCards } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import styles from "./HeroBenefitsSection.module.scss";

const icons = [ShieldCheck, GraduationCap, WalletCards, ClipboardCheck];

type HeroBenefitsSectionProps = {
  placement?: "desktop" | "mobile";
};

export function HeroBenefitsSection({ placement = "desktop" }: HeroBenefitsSectionProps) {
  return (
    <section className={`${styles.section} ${placement === "mobile" ? styles.mobile : styles.desktop}`} aria-label="Преимущества Русского Зодчего">
      <div className={styles.inner}>
        {siteContent.heroBenefits.map((benefit, index) => {
          const Icon = icons[index];

          return (
            <div className={styles.item} key={benefit}>
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
              <p className={styles.text}>{benefit}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
