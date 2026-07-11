import { useState } from "react";
import { Circle } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { useParallaxImage } from "@/hooks/useParallaxImage";
import { withBase } from "@/utils/paths";
import styles from "./CtaSection.module.scss";

type SubmitState = "idle" | "loading" | "success" | "error";

export function CtaSection() {
  const { title, text, image, benefits, form } = siteContent.ctaSection;
  const imageRef = useParallaxImage<HTMLImageElement>({ strength: 32 });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (cleanName.length < 2) {
      setValidationError("Введите имя.");
      return;
    }

    if (digits.length < 10 || digits.length > 15) {
      setValidationError("Введите телефон.");
      return;
    }

    if (!isConsentChecked) {
      setValidationError("Подтвердите согласие.");
      return;
    }

    setValidationError("");
    setSubmitState("loading");

    try {
      const response = await fetch("/api/calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: "Заявка из CTA",
          repairType: "Консультация",
          roomCount: "не указано",
          area: 0,
          estimate: 0,
          name: cleanName,
          contact: phone.trim(),
          contactMethod: "По телефону",
          comment: "Клиент оставил заявку в CTA-блоке.",
        }),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setSubmitState("success");
      setName("");
      setPhone("");
      setIsConsentChecked(false);
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={styles.inner}>
        <figure className={styles.media}>
          <img ref={imageRef} className={styles.parallaxImage} src={image.src} alt={image.alt} loading="lazy" />
        </figure>

        <div className={styles.panel}>
          <h2 className={styles.title} id="cta-title">
            {title}
          </h2>
          <p className={styles.text}>{text}</p>

          <ul className={styles.benefits} aria-label="Что обсудим на консультации">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Circle aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label>
              <span>Имя</span>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder={form.namePlaceholder} autoComplete="name" />
            </label>
            <label>
              <span>Телефон</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={form.phonePlaceholder} autoComplete="tel" inputMode="tel" />
            </label>
            <label className={styles.consent}>
              <input type="checkbox" checked={isConsentChecked} onChange={(event) => setIsConsentChecked(event.target.checked)} />
              <span>
                {form.consent} и принимаю{" "}
                <a href={withBase("/politika")} target="_blank" rel="noreferrer">
                  политику обработки персональных данных
                </a>
              </span>
            </label>
            {validationError ? <p className={styles.status} data-state="error">{validationError}</p> : null}
            {!validationError && submitState === "success" ? <p className={styles.status} data-state="success">Заявка отправлена.</p> : null}
            {!validationError && submitState === "error" ? <p className={styles.status} data-state="error">Не удалось отправить. Напишите нам в Telegram.</p> : null}
            <button className={styles.submit} type="submit" disabled={submitState === "loading"}>
              {submitState === "loading" ? "Отправляем..." : form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
