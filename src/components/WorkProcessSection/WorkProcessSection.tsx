import { ClipboardList, FileText, PackageCheck, PenTool, Ruler } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import styles from "./WorkProcessSection.module.scss";

const icons = [Ruler, PenTool, FileText, PackageCheck, ClipboardList];

export function WorkProcessSection() {
  return (
    <section className={styles.section} id="process" aria-labelledby="work-process-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title} id="work-process-title">
            {siteContent.workProcess.title}
          </h2>
          <p className={styles.text}>{siteContent.workProcess.text}</p>
        </div>

        <div className={styles.list}>
          {siteContent.workProcess.items.map((item, index) => (
            <article className={styles.item} key={item.title}>
              <div className={styles.marker}>
                {(() => {
                  const Icon = icons[index] ?? ClipboardList;
                  return <Icon aria-hidden="true" />;
                })()}
              </div>
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
