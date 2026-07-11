import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./LeadPopup.module.scss";

type SubmitState = "idle" | "loading" | "success" | "error";

const STORAGE_KEY = "russian-zodchiy-lead-popup-closed";
const OPEN_DELAY = 15000;

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closePopup() {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const digits = cleanPhone.replace(/\D/g, "");

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
          projectType: "Попап через 15 секунд",
          repairType: "Индивидуальное предложение",
          roomCount: "не указано",
          area: 0,
          estimate: 0,
          name: cleanName,
          contact: cleanPhone,
          contactMethod: "По телефону",
          comment: "Клиент оставил заявку во всплывающей форме.",
        }),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setSubmitState("success");
      setName("");
      setPhone("");
      setIsConsentChecked(false);
      window.setTimeout(() => setIsOpen(false), 1600);
    } catch {
      setSubmitState("error");
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        closePopup();
      }
    }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="lead-popup-title">
        <button className={styles.close} type="button" onClick={closePopup} aria-label="Закрыть">
          <X aria-hidden="true" />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title} id="lead-popup-title">
            Получите индивидуальное предложение от нашего дизайнера
          </h2>
          <p className={styles.text}>
            Расскажем, какие решения подойдут именно вам, рассчитаем примерный бюджет и предложим стратегию реализации.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span>Имя</span>
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </label>

            <label className={styles.field}>
              <span>Телефон</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+7 (000) 000-00-00" autoComplete="tel" inputMode="tel" />
            </label>

            <label className={styles.consent}>
              <input type="checkbox" checked={isConsentChecked} onChange={(event) => setIsConsentChecked(event.target.checked)} />
              <span>
                Нажимая на кнопку, я соглашаюсь с{" "}
                <a href="/politika" target="_blank" rel="noreferrer">
                  политикой обработки персональных данных
                </a>
              </span>
            </label>

            {validationError ? <p className={styles.status} data-state="error">{validationError}</p> : null}
            {!validationError && submitState === "success" ? <p className={styles.status} data-state="success">Заявка отправлена.</p> : null}
            {!validationError && submitState === "error" ? <p className={styles.status} data-state="error">Не удалось отправить. Напишите нам в Telegram.</p> : null}

            <button className={styles.submit} type="submit" disabled={submitState === "loading"}>
              {submitState === "loading" ? "Отправляем..." : "Получить консультацию"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
