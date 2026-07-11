import { e as createComponent, r as renderTemplate, k as renderComponent, l as renderHead, g as addAttribute } from '../chunks/astro/server_CeoJ177E.mjs';
import 'piccolore';
import { s as siteContent, B as Button, F as Footer, H as Header } from '../chunks/Footer_wc62Z9qg.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useEffect, useRef } from 'react';
import { ShieldCheck, GraduationCap, WalletCards, ClipboardCheck, MessageCircle, ArrowDownRight, X, Circle, ArrowLeft, ArrowRight, Ruler, PenTool, FileText, PackageCheck, ClipboardList } from 'lucide-react';
import { s as styles, a as styles$1, b as styles$2, c as styles$3, d as styles$4, e as styles$5, f as styles$6, g as styles$7, h as styles$8, i as styles$9, j as styles$a, k as styles$b, l as styles$c, m as styles$d, n as styles$e, o as styles$f } from '../chunks/index.95d291e9_8ncd-TQG.mjs';
import '../chunks/index.b9defd66_BfT1t3Fr.mjs';
export { renderers } from '../renderers.mjs';

const repairTypes = ["Под ключ", "Дизайнерский", "Черновой"];
const contactMethods = ["По телефону", "Telegram", "WhatsApp", "Max"];
const basePrices = {
  "Под ключ": 26e3,
  "Дизайнерский": 38e3,
  "Черновой": 15e3
};
function CalculatorSection({ variant = "section" }) {
  const [step, setStep] = useState(1);
  const [repairType, setRepairType] = useState(repairTypes[0]);
  const [area, setArea] = useState(120);
  const [needsMaterials, setNeedsMaterials] = useState("Да");
  const [contactMethod, setContactMethod] = useState("По телефону");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [validationError, setValidationError] = useState("");
  const estimate = useMemo(() => {
    const materialMultiplier = needsMaterials === "Да" ? 1.18 : 1;
    const value = area * (basePrices[repairType] ?? 26e3) * materialMultiplier;
    return Math.round(value / 1e4) * 1e4;
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
  async function handleSubmit(event) {
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
          comment: `Материалы: ${needsMaterials}. Срок: ${duration} дней. Команда: от ${teamSize} человек.`
        })
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
  return /* @__PURE__ */ jsx("section", { className: variant === "hero" ? styles.heroSection : styles.section, id: "calculator", "aria-labelledby": "calculator-title", children: /* @__PURE__ */ jsx("div", { className: styles.inner, children: /* @__PURE__ */ jsxs("form", { className: styles.card, onSubmit: handleSubmit, noValidate: true, children: [
    /* @__PURE__ */ jsx("h3", { className: styles.cardTitle, id: "calculator-title", children: step === 1 ? "Данные для расчета" : "Куда отправить расчет" }),
    /* @__PURE__ */ jsxs("div", { className: styles.cardGrid, children: [
      /* @__PURE__ */ jsx("div", { className: styles.controls, children: step === 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("label", { className: styles.range, children: [
          /* @__PURE__ */ jsx("span", { children: "1. Площадь объекта" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            area,
            " м²"
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "25", max: "220", step: "5", value: area, onChange: (event) => setArea(Number(event.target.value)) })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: styles.group, children: [
          /* @__PURE__ */ jsx("legend", { children: "2. Тип ремонта" }),
          repairTypes.map((type) => /* @__PURE__ */ jsxs("button", { className: repairType === type ? styles.radioActive : styles.radio, type: "button", onClick: () => setRepairType(type), children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true" }),
            type
          ] }, type))
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: styles.group, children: [
          /* @__PURE__ */ jsx("legend", { children: "3. Материалы" }),
          ["Да", "Нет, есть свои"].map((answer) => /* @__PURE__ */ jsxs("button", { className: needsMaterials === answer ? styles.radioActive : styles.radio, type: "button", onClick: () => setNeedsMaterials(answer), children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true" }),
            answer
          ] }, answer))
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("fieldset", { className: styles.group, children: [
          /* @__PURE__ */ jsx("legend", { children: "Способ связи" }),
          contactMethods.map((method) => /* @__PURE__ */ jsxs(
            "button",
            {
              className: contactMethod === method ? styles.radioActive : styles.radio,
              type: "button",
              onClick: () => {
                setContactMethod(method);
                setContact("");
                setValidationError("");
              },
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true" }),
                method
              ]
            },
            method
          ))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles.contactFields, children: [
          /* @__PURE__ */ jsx("span", { children: "Контакт для расчета" }),
          /* @__PURE__ */ jsx("input", { value: name, onChange: (event) => setName(event.target.value), placeholder: "Имя", required: true, "aria-invalid": Boolean(validationError && name.trim().length < 2) }),
          /* @__PURE__ */ jsx("input", { value: contact, onChange: (event) => setContact(event.target.value), placeholder: contactPlaceholder, required: true, "aria-invalid": Boolean(validationError && name.trim().length >= 2) })
        ] }),
        validationError ? /* @__PURE__ */ jsx("p", { className: styles.validation, children: validationError }) : null,
        /* @__PURE__ */ jsx("button", { className: styles.backButton, type: "button", onClick: () => {
          setValidationError("");
          setStep(1);
        }, children: "Изменить параметры" })
      ] }) }),
      /* @__PURE__ */ jsxs("aside", { className: styles.result, children: [
        /* @__PURE__ */ jsxs("div", { className: styles.metric, children: [
          /* @__PURE__ */ jsx("span", { children: "Срок ремонта:" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            duration,
            " дней"
          ] }),
          /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx("b", { style: { width: `${Math.min(92, duration / 2)}%` } }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles.metric, children: [
          /* @__PURE__ */ jsx("span", { children: "Команда проекта:" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            "От ",
            teamSize,
            " человек"
          ] }),
          /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx("b", { style: { width: `${Math.min(92, teamSize * 12)}%` } }) })
        ] }),
        /* @__PURE__ */ jsx("button", { className: styles.submit, type: step === 1 ? "button" : "submit", onClick: step === 1 ? showContactStep : void 0, disabled: submitState === "loading", children: step === 1 ? "Узнать стоимость" : submitState === "loading" ? "Отправляем" : "Отправить расчет" }),
        step === 2 ? /* @__PURE__ */ jsxs("p", { className: styles.legal, children: [
          "Нажимая кнопку, вы соглашаетесь с",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/politika", target: "_blank", rel: "noreferrer", children: "политикой обработки персональных данных" })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: styles.status, "data-state": submitState, children: [
      submitState === "success" ? "Заявка отправлена. Мы скоро свяжемся с вами." : null,
      submitState === "error" ? "Не удалось отправить заявку. Напишите нам в Telegram или попробуйте позже." : null
    ] })
  ] }) }) });
}

const icons$1 = [ShieldCheck, GraduationCap, WalletCards, ClipboardCheck];
function HeroBenefitsSection({ placement = "desktop" }) {
  return /* @__PURE__ */ jsx("section", { className: `${styles$1.section} ${placement === "mobile" ? styles$1.mobile : styles$1.desktop}`, "aria-label": "Преимущества Русского Зодчего", children: /* @__PURE__ */ jsx("div", { className: styles$1.inner, children: siteContent.heroBenefits.map((benefit, index) => {
    const Icon = icons$1[index];
    return /* @__PURE__ */ jsxs("div", { className: styles$1.item, children: [
      /* @__PURE__ */ jsx("span", { className: styles$1.icon, "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, {}) }),
      /* @__PURE__ */ jsx("p", { className: styles$1.text, children: benefit })
    ] }, benefit);
  }) }) });
}

function Hero() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }
    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      const nextOffset = Math.min(90, Math.max(0, window.scrollY * 0.16));
      setParallaxOffset(nextOffset);
    };
    const handleScroll = () => {
      if (animationFrame) {
        return;
      }
      animationFrame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: styles$2.hero, id: "hero", "aria-labelledby": "hero-title", style: { "--hero-parallax": `${parallaxOffset}px` }, children: [
    /* @__PURE__ */ jsx("div", { className: styles$2.media, "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: styles$2.overlay, "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.inner, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$2.content, children: [
        /* @__PURE__ */ jsx("p", { className: styles$2.label, children: siteContent.hero.label }),
        /* @__PURE__ */ jsx("h1", { className: styles$2.title, id: "hero-title", children: siteContent.hero.title }),
        /* @__PURE__ */ jsx("p", { className: styles$2.text, children: siteContent.hero.text }),
        /* @__PURE__ */ jsxs("div", { className: styles$2.actions, children: [
          /* @__PURE__ */ jsx(Button, { href: siteContent.contacts.telegram, variant: "gold", size: "lg", iconLeft: /* @__PURE__ */ jsx(MessageCircle, { "aria-hidden": "true" }), children: siteContent.hero.primaryCta }),
          /* @__PURE__ */ jsx(Button, { href: "#projects", variant: "outlineLight", size: "lg", iconRight: /* @__PURE__ */ jsx(ArrowDownRight, { "aria-hidden": "true" }), children: siteContent.hero.secondaryCta })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$2.mobileBenefits, children: /* @__PURE__ */ jsx(HeroBenefitsSection, { placement: "mobile" }) }),
      /* @__PURE__ */ jsx("div", { className: styles$2.calculator, children: /* @__PURE__ */ jsx(CalculatorSection, { variant: "hero" }) })
    ] })
  ] });
}

const STORAGE_KEY = "russian-zodchiy-lead-popup-closed";
const OPEN_DELAY = 15e3;
function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
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
    const handleKeyDown = (event) => {
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
  async function handleSubmit(event) {
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
          comment: "Клиент оставил заявку во всплывающей форме."
        })
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
  return /* @__PURE__ */ jsx("div", { className: styles$3.overlay, role: "presentation", onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  }, children: /* @__PURE__ */ jsxs("section", { className: styles$3.dialog, role: "dialog", "aria-modal": "true", "aria-labelledby": "lead-popup-title", children: [
    /* @__PURE__ */ jsx("button", { className: styles$3.close, type: "button", onClick: closePopup, "aria-label": "Закрыть", children: /* @__PURE__ */ jsx(X, { "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$3.content, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$3.title, id: "lead-popup-title", children: "Получите индивидуальное предложение от нашего дизайнера" }),
      /* @__PURE__ */ jsx("p", { className: styles$3.text, children: "Расскажем, какие решения подойдут именно вам, рассчитаем примерный бюджет и предложим стратегию реализации." }),
      /* @__PURE__ */ jsxs("form", { className: styles$3.form, onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsxs("label", { className: styles$3.field, children: [
          /* @__PURE__ */ jsx("span", { children: "Имя" }),
          /* @__PURE__ */ jsx("input", { value: name, onChange: (event) => setName(event.target.value), autoComplete: "name" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: styles$3.field, children: [
          /* @__PURE__ */ jsx("span", { children: "Телефон" }),
          /* @__PURE__ */ jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), placeholder: "+7 (000) 000-00-00", autoComplete: "tel", inputMode: "tel" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: styles$3.consent, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: isConsentChecked, onChange: (event) => setIsConsentChecked(event.target.checked) }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Нажимая на кнопку, я соглашаюсь с",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/politika", target: "_blank", rel: "noreferrer", children: "политикой обработки персональных данных" })
          ] })
        ] }),
        validationError ? /* @__PURE__ */ jsx("p", { className: styles$3.status, "data-state": "error", children: validationError }) : null,
        !validationError && submitState === "success" ? /* @__PURE__ */ jsx("p", { className: styles$3.status, "data-state": "success", children: "Заявка отправлена." }) : null,
        !validationError && submitState === "error" ? /* @__PURE__ */ jsx("p", { className: styles$3.status, "data-state": "error", children: "Не удалось отправить. Напишите нам в Telegram." }) : null,
        /* @__PURE__ */ jsx("button", { className: styles$3.submit, type: "submit", disabled: submitState === "loading", children: submitState === "loading" ? "Отправляем..." : "Получить консультацию" })
      ] })
    ] })
  ] }) });
}

function ApproachSection() {
  return /* @__PURE__ */ jsx("section", { className: styles$4.section, "aria-labelledby": "approach-title", children: /* @__PURE__ */ jsxs("div", { className: styles$4.inner, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$4.heading, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$4.title, id: "approach-title", children: siteContent.approach.title }),
      /* @__PURE__ */ jsx("p", { className: styles$4.text, children: siteContent.approach.text })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$4.grid, children: siteContent.approach.items.map((item, index) => /* @__PURE__ */ jsxs("article", { className: styles$4.item, children: [
      /* @__PURE__ */ jsx("span", { className: styles$4.number, children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("h3", { className: styles$4.itemTitle, children: item.title }),
      /* @__PURE__ */ jsx("p", { className: styles$4.itemText, children: item.text })
    ] }, item.title)) })
  ] }) });
}

function useParallaxImage({ strength = 34 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }
    let frameId = 0;
    const update = () => {
      frameId = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2 + rect.height / 2);
      const clampedProgress = Math.max(-1, Math.min(1, progress));
      element.style.setProperty("--parallax-y", `${clampedProgress * strength}px`);
    };
    const requestUpdate = () => {
      if (frameId) {
        return;
      }
      frameId = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      element.style.removeProperty("--parallax-y");
    };
  }, [strength]);
  return ref;
}

function CtaSection() {
  const { title, text, image, benefits, form } = siteContent.ctaSection;
  const imageRef = useParallaxImage({ strength: 32 });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [validationError, setValidationError] = useState("");
  async function handleSubmit(event) {
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
          comment: "Клиент оставил заявку в CTA-блоке."
        })
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
  return /* @__PURE__ */ jsx("section", { className: styles$5.section, "aria-labelledby": "cta-title", children: /* @__PURE__ */ jsxs("div", { className: styles$5.inner, children: [
    /* @__PURE__ */ jsx("figure", { className: styles$5.media, children: /* @__PURE__ */ jsx("img", { ref: imageRef, className: styles$5.parallaxImage, src: image.src, alt: image.alt, loading: "lazy" }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$5.panel, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$5.title, id: "cta-title", children: title }),
      /* @__PURE__ */ jsx("p", { className: styles$5.text, children: text }),
      /* @__PURE__ */ jsx("ul", { className: styles$5.benefits, "aria-label": "Что обсудим на консультации", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx(Circle, { "aria-hidden": "true" }),
        benefit
      ] }, benefit)) }),
      /* @__PURE__ */ jsxs("form", { className: styles$5.form, onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Имя" }),
          /* @__PURE__ */ jsx("input", { value: name, onChange: (event) => setName(event.target.value), placeholder: form.namePlaceholder, autoComplete: "name" })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Телефон" }),
          /* @__PURE__ */ jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), placeholder: form.phonePlaceholder, autoComplete: "tel", inputMode: "tel" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: styles$5.consent, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: isConsentChecked, onChange: (event) => setIsConsentChecked(event.target.checked) }),
          /* @__PURE__ */ jsxs("span", { children: [
            form.consent,
            " и принимаю",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/politika", target: "_blank", rel: "noreferrer", children: "политику обработки персональных данных" })
          ] })
        ] }),
        validationError ? /* @__PURE__ */ jsx("p", { className: styles$5.status, "data-state": "error", children: validationError }) : null,
        !validationError && submitState === "success" ? /* @__PURE__ */ jsx("p", { className: styles$5.status, "data-state": "success", children: "Заявка отправлена." }) : null,
        !validationError && submitState === "error" ? /* @__PURE__ */ jsx("p", { className: styles$5.status, "data-state": "error", children: "Не удалось отправить. Напишите нам в Telegram." }) : null,
        /* @__PURE__ */ jsx("button", { className: styles$5.submit, type: "submit", disabled: submitState === "loading", children: submitState === "loading" ? "Отправляем..." : form.submit })
      ] })
    ] })
  ] }) });
}

const yandexMapEmbedUrl = "https://yandex.ru/map-widget/v1/?ll=37.572890%2C55.758220&mode=search&oid=159384154953&ol=biz&z=16";
const address = "Москва, переулок Капранова, 3, стр. 3";
function ContactsSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { contacts } = siteContent;
  const phoneHref = `tel:+7${contacts.phone.replace(/\D/g, "").replace(/^8/, "")}`;
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }
    let animationFrame = 0;
    const updateProgress = () => {
      animationFrame = 0;
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const nextProgress = 1 - (rect.top + rect.height * 0.3) / (viewport + rect.height * 0.3);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };
    const handleScroll = () => {
      if (animationFrame) {
        return;
      }
      animationFrame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);
  const contentShift = `${(0.5 - progress) * 56}px`;
  return /* @__PURE__ */ jsx("section", { className: styles$6.section, id: "contacts", ref: sectionRef, "aria-labelledby": "contacts-title", children: /* @__PURE__ */ jsxs("div", { className: styles$6.inner, children: [
    /* @__PURE__ */ jsx("div", { className: styles$6.map, "aria-label": "Карта Русский Зодчий на Яндекс Картах", children: /* @__PURE__ */ jsx("iframe", { src: yandexMapEmbedUrl, title: "Русский Зодчий на Яндекс Картах", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$6.content, style: { transform: `translateY(${contentShift})` }, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$6.title, id: "contacts-title", children: "Контакты" }),
      /* @__PURE__ */ jsxs("div", { className: styles$6.contactsBox, children: [
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("strong", { children: address }) }),
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("a", { href: phoneHref, children: contacts.phoneLabel }) }),
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("a", { href: contacts.telegram, target: "_blank", rel: "noreferrer", children: "Telegram" }) }),
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("a", { href: contacts.whatsapp, target: "_blank", rel: "noreferrer", children: "WhatsApp" }) }),
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("a", { href: contacts.max, target: "_blank", rel: "noreferrer", children: "Max" }) }),
        /* @__PURE__ */ jsx("div", { className: styles$6.contactItem, children: /* @__PURE__ */ jsx("a", { href: `mailto:${contacts.email}`, children: contacts.email }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$6.action, children: /* @__PURE__ */ jsx(Button, { href: contacts.telegram, variant: "green", size: "lg", children: "Получить консультацию" }) })
    ] })
  ] }) });
}

const interactiveSelector = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';
function CustomCursor() {
  const cursorRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  useEffect(() => {
    const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => {
      setIsEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    };
    updateEnabled();
    desktopQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);
    return () => {
      desktopQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-enabled", isEnabled);
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [isEnabled]);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !isEnabled) {
      return;
    }
    let frameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(render);
    };
    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setIsHovering(Boolean(event.target?.closest(interactiveSelector)));
    };
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);
    const handlePointerLeave = () => cursor.classList.add(styles$7.hidden);
    const handlePointerEnter = () => cursor.classList.remove(styles$7.hidden);
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isEnabled]);
  if (!isEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { ref: cursorRef, className: `${styles$7.cursor} ${isHovering ? styles$7.hovering : ""} ${isPressed ? styles$7.pressed : ""}`, "aria-hidden": "true" });
}

function TelegramIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M21.7 3.8 18.4 20c-.2 1-.8 1.2-1.6.7l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.3L6.1 13.5 1.3 12c-1-.3-1-1 .2-1.5L20.3 3.2c.9-.3 1.7.2 1.4.6Z" }) });
}
function WhatsAppIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.5 21.8l5-1.2A9.7 9.7 0 1 0 12 2.2Zm0 2a7.7 7.7 0 0 1 6.6 11.6 7.6 7.6 0 0 1-9.9 2.8l-.4-.2-2.9.7.7-2.8-.3-.5A7.7 7.7 0 0 1 12 4.2Zm-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.8-.9c-.3-.1-.5-.2-.7.2l-.8 1c-.1.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.2-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.8-1.9c-.2-.5-.4-.5-.6-.5h-.4Z" }) });
}
function MaxIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 1000 1000", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
    }
  ) });
}
function VkIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 7.1c.1 5.1 2.7 8.2 7.2 8.2h.3v-2.9c1.6.2 2.8 1.3 3.3 2.9h2.9c-.6-2.3-2.3-3.5-3.4-4 1.1-.7 2.6-2.1 3-4.2h-2.7c-.5 1.6-1.9 3-3.1 3.1V7.1H8.3v5.5c-1.4-.3-3.2-2-3.3-5.5H3.5Z" }) });
}
function ChatIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: "M21 12a8.7 8.7 0 0 1-9 8.5 9.8 9.8 0 0 1-4.4-1l-4 1.2 1.2-3.6A8.1 8.1 0 0 1 3 12a8.7 8.7 0 0 1 9-8.5A8.7 8.7 0 0 1 21 12Z" }),
    /* @__PURE__ */ jsx("path", { d: "M8.2 11.9h.1M12 11.9h.1M15.8 11.9h.1" })
  ] });
}
function CloseIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" }) });
}
function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { contacts } = siteContent;
  const links = [
    { label: "Telegram", href: contacts.telegram, icon: /* @__PURE__ */ jsx(TelegramIcon, {}) },
    { label: "WhatsApp", href: contacts.whatsapp, icon: /* @__PURE__ */ jsx(WhatsAppIcon, {}) },
    { label: "Max", href: contacts.max, icon: /* @__PURE__ */ jsx(MaxIcon, {}) },
    { label: "VK", href: contacts.vk, icon: /* @__PURE__ */ jsx(VkIcon, {}) }
  ];
  useEffect(() => {
    let scrollTimeout = 0;
    const updateReveal = () => {
      const hero = document.querySelector("#hero");
      const isAfterHero = hero instanceof HTMLElement ? hero.getBoundingClientRect().bottom <= 80 : true;
      setIsRevealed(isAfterHero);
      if (!isAfterHero) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => {
      setIsScrolling(true);
      setIsOpen(false);
      updateReveal();
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
        updateReveal();
      }, 220);
    };
    updateReveal();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateReveal);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateReveal);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `${styles$8.floating} ${isRevealed ? styles$8.revealed : ""} ${isScrolling ? styles$8.scrolling : ""} ${isOpen ? styles$8.open : ""}`, children: [
    /* @__PURE__ */ jsx("nav", { className: styles$8.list, "aria-label": "Быстрые контакты", "aria-hidden": !isOpen ? "true" : void 0, children: links.map((link) => /* @__PURE__ */ jsx("a", { className: styles$8.link, href: link.href, target: "_blank", rel: "noreferrer", "aria-label": link.label, "data-label": link.label, onClick: () => setIsOpen(false), children: link.icon }, link.label)) }),
    /* @__PURE__ */ jsxs("button", { className: styles$8.trigger, type: "button", "aria-label": isOpen ? "Закрыть быстрые контакты" : "Открыть быстрые контакты", "aria-expanded": isOpen, onClick: () => setIsOpen((current) => !current), children: [
      /* @__PURE__ */ jsx("span", { className: styles$8.triggerIconChat, children: /* @__PURE__ */ jsx(ChatIcon, {}) }),
      /* @__PURE__ */ jsx("span", { className: styles$8.triggerIconClose, children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    ] })
  ] });
}

function FounderSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const nextProgress = 1 - (rect.top + rect.height * 0.35) / (viewport + rect.height * 0.35);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  const textShift = `${(0.5 - progress) * 54}px`;
  const quoteShift = `${(progress - 0.5) * 38}px`;
  return /* @__PURE__ */ jsx("section", { className: styles$9.section, ref: sectionRef, "aria-labelledby": "founder-title", children: /* @__PURE__ */ jsxs("div", { className: styles$9.inner, children: [
    /* @__PURE__ */ jsxs("figure", { className: styles$9.photo, children: [
      /* @__PURE__ */ jsx("div", { className: styles$9.photoPlaceholder, "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { children: "RR" }) }),
      /* @__PURE__ */ jsxs("figcaption", { children: [
        /* @__PURE__ */ jsx("span", { children: siteContent.founderSection.name }),
        /* @__PURE__ */ jsx("span", { children: siteContent.founderSection.role })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$9.content, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$9.title, id: "founder-title", style: { transform: `translateY(${textShift})` }, children: siteContent.founderSection.title }),
      /* @__PURE__ */ jsx("blockquote", { className: styles$9.quote, style: { transform: `translateY(${quoteShift})` }, children: siteContent.founderSection.quote }),
      /* @__PURE__ */ jsx("p", { className: styles$9.text, children: siteContent.founderSection.text }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.person, children: [
        /* @__PURE__ */ jsx("strong", { children: siteContent.founderSection.name }),
        /* @__PURE__ */ jsx("span", { children: siteContent.founderSection.role })
      ] })
    ] })
  ] }) });
}

function PortfolioSection() {
  const [imageIndexes, setImageIndexes] = useState(() => siteContent.portfolio.items.map(() => 0));
  const viewportRef = useRef(null);
  const items = siteContent.portfolio.items;
  const scrollTrack = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const firstCard = viewport.querySelector("[data-portfolio-card]");
    const track = viewport.querySelector("[data-portfolio-track]");
    const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
    const step = firstCard ? firstCard.offsetWidth + gap : viewport.clientWidth * 0.8;
    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth"
    });
  };
  const selectCardImage = (cardIndex, direction) => {
    setImageIndexes(
      (current) => current.map((imageIndex, index) => {
        if (index !== cardIndex) {
          return imageIndex;
        }
        return (imageIndex + direction + items[cardIndex].images.length) % items[cardIndex].images.length;
      })
    );
  };
  return /* @__PURE__ */ jsxs("section", { className: styles$a.section, id: "projects", "aria-labelledby": "portfolio-title", children: [
    /* @__PURE__ */ jsxs("div", { className: styles$a.header, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$a.title, id: "portfolio-title", children: siteContent.portfolio.title }),
      /* @__PURE__ */ jsxs("div", { className: styles$a.headerControls, "aria-label": "Переключение ленты портфолио", children: [
        /* @__PURE__ */ jsx("button", { className: styles$a.navButton, type: "button", onClick: () => scrollTrack(-1), "aria-label": "Прокрутить портфолио назад", children: /* @__PURE__ */ jsx(ArrowLeft, { "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("button", { className: styles$a.navButton, type: "button", onClick: () => scrollTrack(1), "aria-label": "Прокрутить портфолио вперёд", children: /* @__PURE__ */ jsx(ArrowRight, { "aria-hidden": "true" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$a.viewport, ref: viewportRef, children: /* @__PURE__ */ jsx("div", { className: styles$a.track, "data-portfolio-track": true, children: items.map((item, index) => /* @__PURE__ */ jsxs("article", { className: styles$a.card, "data-portfolio-card": true, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$a.media, children: [
        /* @__PURE__ */ jsx("img", { src: item.images[imageIndexes[index]].src, alt: item.images[imageIndexes[index]].alt }),
        /* @__PURE__ */ jsx("button", { className: `${styles$a.arrow} ${styles$a.arrowPrev}`, type: "button", onClick: () => selectCardImage(index, -1), "aria-label": `Предыдущее фото проекта ${item.title}`, children: /* @__PURE__ */ jsx(ArrowLeft, { "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("button", { className: `${styles$a.arrow} ${styles$a.arrowNext}`, type: "button", onClick: () => selectCardImage(index, 1), "aria-label": `Следующее фото проекта ${item.title}`, children: /* @__PURE__ */ jsx(ArrowRight, { "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("a", { className: styles$a.more, href: "#contacts", children: "Подробнее" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$a.caption, children: [
        /* @__PURE__ */ jsx("h3", { className: styles$a.cardTitle, children: item.title }),
        /* @__PURE__ */ jsxs("div", { className: styles$a.meta, children: [
          /* @__PURE__ */ jsx("span", { children: item.area }),
          /* @__PURE__ */ jsx("span", { children: item.days })
        ] })
      ] })
    ] }, item.title)) }) })
  ] });
}

function ProjectCtaSection() {
  return /* @__PURE__ */ jsx("section", { className: styles$b.section, "aria-labelledby": "project-cta-title", children: /* @__PURE__ */ jsxs("div", { className: styles$b.inner, children: [
    /* @__PURE__ */ jsx("div", { className: styles$b.sheetWrap, "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { className: styles$b.sheetImage, src: "/assets/cta/project-sheet-cutout.png", alt: "", loading: "lazy" }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$b.content, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$b.title, id: "project-cta-title", children: "Обсудим ваш проект?" }),
      /* @__PURE__ */ jsx("p", { className: styles$b.text, children: "Расскажем, какие решения подойдут именно вам, рассчитаем примерный бюджет и предложим стратегию реализации." }),
      /* @__PURE__ */ jsx(Button, { href: siteContent.contacts.telegram, variant: "light", size: "lg", className: styles$b.button, children: "Получить консультацию" })
    ] })
  ] }) });
}

function ReviewsSection() {
  const { title, items } = siteContent.reviewsSection;
  const scrollerRef = useRef(null);
  const [activeReview, setActiveReview] = useState(null);
  useEffect(() => {
    if (!activeReview) {
      return;
    }
    const handleKeyDown = (event) => {
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
  const scrollReviews = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    const firstCard = scroller.querySelector("[data-review-card]");
    const track = scroller.querySelector("[data-review-track]");
    const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
    const step = firstCard ? firstCard.offsetWidth + gap : scroller.clientWidth * 0.8;
    scroller.scrollBy({
      left: direction * step,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs("section", { className: styles$c.section, id: "reviews", "aria-labelledby": "reviews-title", children: [
    /* @__PURE__ */ jsxs("div", { className: styles$c.inner, children: [
      /* @__PURE__ */ jsxs("header", { className: styles$c.header, children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: styles$c.title, id: "reviews-title", children: title }) }),
        /* @__PURE__ */ jsxs("div", { className: styles$c.headerControls, "aria-label": "Переключение отзывов", children: [
          /* @__PURE__ */ jsx("button", { className: styles$c.navButton, type: "button", onClick: () => scrollReviews(-1), "aria-label": "Прокрутить отзывы назад", children: /* @__PURE__ */ jsx(ArrowLeft, { "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsx("button", { className: styles$c.navButton, type: "button", onClick: () => scrollReviews(1), "aria-label": "Прокрутить отзывы вперёд", children: /* @__PURE__ */ jsx(ArrowRight, { "aria-hidden": "true" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$c.scroller, ref: scrollerRef, "aria-label": "Отзывы клиентов", children: /* @__PURE__ */ jsx("div", { className: styles$c.track, "data-review-track": true, children: items.map((review, index) => /* @__PURE__ */ jsx("button", { className: styles$c.card, type: "button", onClick: () => setActiveReview(review), "data-review-card": true, "aria-label": "Открыть отзыв крупнее", children: /* @__PURE__ */ jsx("img", { className: styles$c.image, src: review.src, alt: review.alt, loading: index < 2 ? "eager" : "lazy", decoding: "async" }) }, review.src)) }) }),
      /* @__PURE__ */ jsx("p", { className: styles$c.moreText, children: /* @__PURE__ */ jsx("a", { href: "https://yandex.ru/maps/org/russkiy_zodchiy/159384154953/reviews/?ll=37.572890%2C55.758220&z=16", target: "_blank", rel: "noreferrer", children: "Смотреть больше отзывов" }) })
    ] }),
    activeReview ? /* @__PURE__ */ jsxs("div", { className: styles$c.modal, role: "dialog", "aria-modal": "true", "aria-label": "Отзыв клиента", onClick: () => setActiveReview(null), children: [
      /* @__PURE__ */ jsx("button", { className: styles$c.modalClose, type: "button", onClick: () => setActiveReview(null), "aria-label": "Закрыть отзыв", children: /* @__PURE__ */ jsx(X, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx("div", { className: styles$c.modalContent, onClick: (event) => event.stopPropagation(), children: /* @__PURE__ */ jsx("img", { className: styles$c.modalImage, src: activeReview.src, alt: activeReview.alt }) })
    ] }) : null
  ] });
}

function ServicesSection() {
  const imageRef = useParallaxImage({ strength: 38 });
  return /* @__PURE__ */ jsx("section", { className: styles$d.section, id: "services", "aria-labelledby": "services-title", children: /* @__PURE__ */ jsxs("div", { className: styles$d.inner, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$d.header, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$d.title, id: "services-title", children: siteContent.servicesSection.title }),
      /* @__PURE__ */ jsx("p", { className: styles$d.text, children: siteContent.servicesSection.text })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$d.body, children: [
      /* @__PURE__ */ jsx("figure", { className: styles$d.media, children: /* @__PURE__ */ jsx("img", { ref: imageRef, className: styles$d.parallaxImage, src: siteContent.servicesSection.image.src, alt: siteContent.servicesSection.image.alt }) }),
      /* @__PURE__ */ jsx("div", { className: styles$d.list, children: siteContent.servicesSection.items.map((item, index) => /* @__PURE__ */ jsxs("article", { className: styles$d.item, children: [
        /* @__PURE__ */ jsx("span", { className: styles$d.number, children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs("div", { className: styles$d.itemContent, children: [
          /* @__PURE__ */ jsx("h3", { className: styles$d.itemTitle, children: item.title }),
          /* @__PURE__ */ jsx("p", { className: styles$d.itemText, children: item.text })
        ] })
      ] }, item.title)) })
    ] })
  ] }) });
}

function StatsSection() {
  const { image, items } = siteContent.stats;
  const panelRef = useRef(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      setIsPanelVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPanelVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );
    observer.observe(panel);
    return () => {
      observer.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: styles$e.section, "aria-label": "Русский Зодчий в цифрах", children: [
    /* @__PURE__ */ jsx("div", { className: styles$e.imageWrap, children: /* @__PURE__ */ jsx("img", { className: styles$e.image, src: image.src, alt: image.alt, loading: "lazy" }) }),
    /* @__PURE__ */ jsx("div", { ref: panelRef, className: `${styles$e.statsPanel} ${isPanelVisible ? styles$e.statsPanelVisible : ""}`, children: /* @__PURE__ */ jsx("div", { className: styles$e.list, children: items.map((item) => {
      return /* @__PURE__ */ jsxs("div", { className: styles$e.item, children: [
        /* @__PURE__ */ jsx("strong", { className: styles$e.value, children: item.value }),
        /* @__PURE__ */ jsx("span", { className: styles$e.label, children: item.label })
      ] }, item.label);
    }) }) })
  ] });
}

const icons = [Ruler, PenTool, FileText, PackageCheck, ClipboardList];
function WorkProcessSection() {
  return /* @__PURE__ */ jsx("section", { className: styles$f.section, id: "process", "aria-labelledby": "work-process-title", children: /* @__PURE__ */ jsxs("div", { className: styles$f.inner, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$f.header, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$f.title, id: "work-process-title", children: siteContent.workProcess.title }),
      /* @__PURE__ */ jsx("p", { className: styles$f.text, children: siteContent.workProcess.text })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$f.list, children: siteContent.workProcess.items.map((item, index) => /* @__PURE__ */ jsxs("article", { className: styles$f.item, children: [
      /* @__PURE__ */ jsx("div", { className: styles$f.marker, children: (() => {
        const Icon = icons[index] ?? ClipboardList;
        return /* @__PURE__ */ jsx(Icon, { "aria-hidden": "true" });
      })() }),
      /* @__PURE__ */ jsx("span", { className: styles$f.number, children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("h3", { className: styles$f.itemTitle, children: item.title }),
      /* @__PURE__ */ jsx("p", { className: styles$f.itemText, children: item.text })
    ] }, item.title)) })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const siteUrl = "https://skrusskizodchy.ru";
  const pageTitle = `${siteContent.company.name} - \u0440\u0435\u043C\u043E\u043D\u0442 \u043A\u0432\u0430\u0440\u0442\u0438\u0440 \u0438 \u0434\u043E\u043C\u043E\u0432 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E`;
  const pageDescription = `${siteContent.company.name}: \u0440\u0435\u043C\u043E\u043D\u0442 \u043A\u0432\u0430\u0440\u0442\u0438\u0440 \u0438 \u0434\u043E\u043C\u043E\u0432 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E \u0441 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u043C \u0438 \u0437\u0430\u044F\u0432\u043A\u043E\u0439 \u0432 Telegram.`;
  const previewImage = `${siteUrl}/assets/meta/og-image.jpg`;
  return renderTemplate(_a || (_a = __template(['<html lang="ru"> <head><meta charset="UTF-8"><script>\n      document.documentElement.classList.add("reveal-enabled");\n    <\/script><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><link rel="canonical"', '><link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180"><meta name="theme-color" content="#102820"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:secure_url"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u0417\u043E\u0434\u0447\u0438\u0439 - \u0440\u0435\u043C\u043E\u043D\u0442 \u043A\u0432\u0430\u0440\u0442\u0438\u0440 \u0438 \u0434\u043E\u043C\u043E\u0432 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E"><meta property="og:locale" content="ru_RU"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', "><title>", "</title>", "</head> <body> ", " <main> ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " </main> ", " ", " ", " ", ' <script>\n      (() => {\n        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");\n\n        const revealTargets = () => {\n          const sections = Array.from(document.querySelectorAll("main > section"));\n          const targets = new Set();\n\n          sections.forEach((section) => {\n            targets.add(section);\n\n            const directChildren = Array.from(section.querySelectorAll(":scope > div > *, :scope > article > *, :scope > div > div > article, :scope > div > div > figure"));\n            directChildren.slice(0, 10).forEach((element, index) => {\n              if (element instanceof HTMLElement && !element.hasAttribute("style")) {\n                element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);\n                targets.add(element);\n              }\n            });\n          });\n\n          return Array.from(targets).filter((element) => element instanceof HTMLElement);\n        };\n\n        const show = (element) => {\n          element.setAttribute("data-reveal", "visible");\n        };\n\n        const init = () => {\n          const targets = revealTargets();\n\n          if (reducedMotion.matches || !("IntersectionObserver" in window)) {\n            targets.forEach(show);\n            return;\n          }\n\n          targets.forEach((element) => element.setAttribute("data-reveal", "hidden"));\n\n          const observer = new IntersectionObserver(\n            (entries) => {\n              entries.forEach((entry) => {\n                if (!entry.isIntersecting) {\n                  return;\n                }\n\n                show(entry.target);\n                observer.unobserve(entry.target);\n              });\n            },\n            {\n              rootMargin: "0px 0px -12% 0px",\n              threshold: 0.12,\n            },\n          );\n\n          targets.forEach((element) => observer.observe(element));\n        };\n\n        if (document.readyState === "loading") {\n          document.addEventListener("DOMContentLoaded", init, { once: true });\n        } else {\n          init();\n        }\n      })();\n    <\/script> </body> </html>'], ['<html lang="ru"> <head><meta charset="UTF-8"><script>\n      document.documentElement.classList.add("reveal-enabled");\n    <\/script><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><link rel="canonical"', '><link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180"><meta name="theme-color" content="#102820"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:secure_url"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u0417\u043E\u0434\u0447\u0438\u0439 - \u0440\u0435\u043C\u043E\u043D\u0442 \u043A\u0432\u0430\u0440\u0442\u0438\u0440 \u0438 \u0434\u043E\u043C\u043E\u0432 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E"><meta property="og:locale" content="ru_RU"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', "><title>", "</title>", "</head> <body> ", " <main> ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " </main> ", " ", " ", " ", ' <script>\n      (() => {\n        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");\n\n        const revealTargets = () => {\n          const sections = Array.from(document.querySelectorAll("main > section"));\n          const targets = new Set();\n\n          sections.forEach((section) => {\n            targets.add(section);\n\n            const directChildren = Array.from(section.querySelectorAll(":scope > div > *, :scope > article > *, :scope > div > div > article, :scope > div > div > figure"));\n            directChildren.slice(0, 10).forEach((element, index) => {\n              if (element instanceof HTMLElement && !element.hasAttribute("style")) {\n                element.style.setProperty("--reveal-delay", \\`\\${Math.min(index * 70, 280)}ms\\`);\n                targets.add(element);\n              }\n            });\n          });\n\n          return Array.from(targets).filter((element) => element instanceof HTMLElement);\n        };\n\n        const show = (element) => {\n          element.setAttribute("data-reveal", "visible");\n        };\n\n        const init = () => {\n          const targets = revealTargets();\n\n          if (reducedMotion.matches || !("IntersectionObserver" in window)) {\n            targets.forEach(show);\n            return;\n          }\n\n          targets.forEach((element) => element.setAttribute("data-reveal", "hidden"));\n\n          const observer = new IntersectionObserver(\n            (entries) => {\n              entries.forEach((entry) => {\n                if (!entry.isIntersecting) {\n                  return;\n                }\n\n                show(entry.target);\n                observer.unobserve(entry.target);\n              });\n            },\n            {\n              rootMargin: "0px 0px -12% 0px",\n              threshold: 0.12,\n            },\n          );\n\n          targets.forEach((element) => observer.observe(element));\n        };\n\n        if (document.readyState === "loading") {\n          document.addEventListener("DOMContentLoaded", init, { once: true });\n        } else {\n          init();\n        }\n      })();\n    <\/script> </body> </html>'])), addAttribute(pageDescription, "content"), addAttribute(siteUrl, "href"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(siteUrl, "content"), addAttribute(previewImage, "content"), addAttribute(previewImage, "content"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(previewImage, "content"), pageTitle, renderHead(), renderComponent($$result, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Header", "client:component-export": "Header" }), renderComponent($$result, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Hero", "client:component-export": "Hero" }), renderComponent($$result, "HeroBenefitsSection", HeroBenefitsSection, {}), renderComponent($$result, "ApproachSection", ApproachSection, {}), renderComponent($$result, "ServicesSection", ServicesSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ServicesSection", "client:component-export": "ServicesSection" }), renderComponent($$result, "PortfolioSection", PortfolioSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/PortfolioSection", "client:component-export": "PortfolioSection" }), renderComponent($$result, "WorkProcessSection", WorkProcessSection, {}), renderComponent($$result, "ProjectCtaSection", ProjectCtaSection, {}), renderComponent($$result, "FounderSection", FounderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FounderSection", "client:component-export": "FounderSection" }), renderComponent($$result, "StatsSection", StatsSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/StatsSection", "client:component-export": "StatsSection" }), renderComponent($$result, "ReviewsSection", ReviewsSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ReviewsSection", "client:component-export": "ReviewsSection" }), renderComponent($$result, "CtaSection", CtaSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/CtaSection", "client:component-export": "CtaSection" }), renderComponent($$result, "ContactsSection", ContactsSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ContactsSection", "client:component-export": "ContactsSection" }), renderComponent($$result, "Footer", Footer, {}), renderComponent($$result, "FloatingSocials", FloatingSocials, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FloatingSocials", "client:component-export": "FloatingSocials" }), renderComponent($$result, "CustomCursor", CustomCursor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/CustomCursor", "client:component-export": "CustomCursor" }), renderComponent($$result, "LeadPopup", LeadPopup, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/LeadPopup", "client:component-export": "LeadPopup" }));
}, "/home/ivan/studio/russian_architect/src/pages/index.astro", void 0);

const $$file = "/home/ivan/studio/russian_architect/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
