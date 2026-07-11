import { useMemo, useState } from "react";
import { withBase } from "@/utils/paths";
import styles from "./CalculatorSection.module.scss";

type SubmitState = "idle" | "loading" | "success" | "error";
type ContactMethod = "По телефону" | "Telegram" | "WhatsApp" | "Max";

const repairTypes = ["Под ключ", "Дизайнерский", "Черновой"];
const contactMethods: ContactMethod[] = ["По телефону", "Telegram", "WhatsApp", "Max"];

const basePrices: Record<string, number> = {
  "Под ключ": 26000,
  "Дизайнерский": 38000,
  "Черновой": 15000,
};

type CalculatorSectionProps = {
  variant?: "section" | "hero";
};

export function CalculatorSection({ variant = "section" }: CalculatorSectionProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [repairType, setRepairType] = useState(repairTypes[0]);
  const [area, setArea] = useState(120);
  const [needsMaterials, setNeedsMaterials] = useState("Да");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("По телефону");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [validationError, setValidationError] = useState("");

  const estimate = useMemo(() => {
    const materialMultiplier = needsMaterials === "Да" ? 1.18 : 1;
    const value = area * (basePrices[repairType] ?? 26000) * materialMultiplier;
    return Math.round(value / 10000) * 10000;
  }, [area, needsMaterials, repairType]);

  const duration = Math.max(45, Math.round(area * (repairType === "Черновой" ? 0.85 : 1.25)));
  const teamSize = Math.max(4, Math.ceil(area / 18));
  const contactPlaceholder = contactMethod === "Telegram" ? "@username" : "+7 999 000-00-00";

  function showContactStep() {
    setSubmitState("idle");
    setValidationError("");
    setStep(2);
  }

  function getValidationError() {
    const cleanName = name.trim();
    const cleanContact = contact.trim();

    if (cleanName.length < 2) {
      return "Введите имя: минимум 2 символа.";
    }

    if (contactMethod === "Telegram") {
      const isUsername = /^@[A-Za-z0-9_]{5,32}$/.test(cleanContact);
      const isNumericId = /^\d{5,15}$/.test(cleanContact);
      return isUsername || isNumericId ? "" : "Введите Telegram: @username от 5 символов или числовой id.";
    }

    const digits = cleanContact.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15 ? "" : "Введите телефон: от 10 до 15 цифр.";
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      showContactStep();
      return;
    }

    const error = getValidationError();
    if (error) {
      setSubmitState("idle");
      setValidationError(error);
      return;
    }

    setValidationError("");
    setSubmitState("loading");

    try {
      const response = await fetch("/api/calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: "Квартира / дом",
          repairType,
          roomCount: "не указано",
          area,
          estimate,
          name,
          contact,
          contactMethod,
          comment: `Материалы: ${needsMaterials}. Срок: ${duration} дней. Команда: от ${teamSize} человек.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setSubmitState("success");
      setName("");
      setContact("");
      setStep(1);
      setValidationError("");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className={variant === "hero" ? styles.heroSection : styles.section} id="calculator" aria-labelledby="calculator-title">
      <div className={styles.inner}>
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <h3 className={styles.cardTitle} id="calculator-title">
            {step === 1 ? "Данные для расчета" : "Куда отправить расчет"}
          </h3>

          <div className={styles.cardGrid}>
            <div className={styles.controls}>
              {step === 1 ? (
                <>
                  <label className={styles.range}>
                    <span>1. Площадь объекта</span>
                    <strong>{area} м²</strong>
                    <input type="range" min="25" max="220" step="5" value={area} onChange={(event) => setArea(Number(event.target.value))} />
                  </label>

                  <fieldset className={styles.group}>
                    <legend>2. Тип ремонта</legend>
                    {repairTypes.map((type) => (
                      <button className={repairType === type ? styles.radioActive : styles.radio} type="button" onClick={() => setRepairType(type)} key={type}>
                        <span aria-hidden="true" />
                        {type}
                      </button>
                    ))}
                  </fieldset>

                  <fieldset className={styles.group}>
                    <legend>3. Материалы</legend>
                    {["Да", "Нет, есть свои"].map((answer) => (
                      <button className={needsMaterials === answer ? styles.radioActive : styles.radio} type="button" onClick={() => setNeedsMaterials(answer)} key={answer}>
                        <span aria-hidden="true" />
                        {answer}
                      </button>
                    ))}
                  </fieldset>
                </>
              ) : (
                <>
                  <fieldset className={styles.group}>
                    <legend>Способ связи</legend>
                    {contactMethods.map((method) => (
                      <button
                        className={contactMethod === method ? styles.radioActive : styles.radio}
                        type="button"
                        onClick={() => {
                          setContactMethod(method);
                          setContact("");
                          setValidationError("");
                        }}
                        key={method}
                      >
                        <span aria-hidden="true" />
                        {method}
                      </button>
                    ))}
                  </fieldset>

                  <div className={styles.contactFields}>
                    <span>Контакт для расчета</span>
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" required aria-invalid={Boolean(validationError && name.trim().length < 2)} />
                    <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder={contactPlaceholder} required aria-invalid={Boolean(validationError && name.trim().length >= 2)} />
                  </div>
                  {validationError ? <p className={styles.validation}>{validationError}</p> : null}
                  <button className={styles.backButton} type="button" onClick={() => {
                    setValidationError("");
                    setStep(1);
                  }}>
                    Изменить параметры
                  </button>
                </>
              )}
            </div>

            <aside className={styles.result}>
              <div className={styles.metric}>
                <span>Срок ремонта:</span>
                <strong>{duration} дней</strong>
                <i>
                  <b style={{ width: `${Math.min(92, duration / 2)}%` }} />
                </i>
              </div>
              <div className={styles.metric}>
                <span>Команда проекта:</span>
                <strong>От {teamSize} человек</strong>
                <i>
                  <b style={{ width: `${Math.min(92, teamSize * 12)}%` }} />
                </i>
              </div>
              <button className={styles.submit} type={step === 1 ? "button" : "submit"} onClick={step === 1 ? showContactStep : undefined} disabled={submitState === "loading"}>
                {step === 1 ? "Узнать стоимость" : submitState === "loading" ? "Отправляем" : "Отправить расчет"}
              </button>
              {step === 2 ? (
                <p className={styles.legal}>
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href={withBase("/politika")} target="_blank" rel="noreferrer">
                    политикой обработки персональных данных
                  </a>
                </p>
              ) : null}
            </aside>
          </div>

          <p className={styles.status} data-state={submitState}>
            {submitState === "success" ? "Заявка отправлена. Мы скоро свяжемся с вами." : null}
            {submitState === "error" ? "Не удалось отправить заявку. Напишите нам в Telegram или попробуйте позже." : null}
          </p>
        </form>
      </div>
    </section>
  );
}
