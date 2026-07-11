import { useEffect, useState } from "react";
import { siteContent } from "@/data/siteContent";
import styles from "./FloatingSocials.module.scss";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.7 3.8 18.4 20c-.2 1-.8 1.2-1.6.7l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.3L6.1 13.5 1.3 12c-1-.3-1-1 .2-1.5L20.3 3.2c.9-.3 1.7.2 1.4.6Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.5 21.8l5-1.2A9.7 9.7 0 1 0 12 2.2Zm0 2a7.7 7.7 0 0 1 6.6 11.6 7.6 7.6 0 0 1-9.9 2.8l-.4-.2-2.9.7.7-2.8-.3-.5A7.7 7.7 0 0 1 12 4.2Zm-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.8-.9c-.3-.1-.5-.2-.7.2l-.8 1c-.1.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.2-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.8-1.9c-.2-.5-.4-.5-.6-.5h-.4Z" />
    </svg>
  );
}

function MaxIcon() {
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
      />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 7.1c.1 5.1 2.7 8.2 7.2 8.2h.3v-2.9c1.6.2 2.8 1.3 3.3 2.9h2.9c-.6-2.3-2.3-3.5-3.4-4 1.1-.7 2.6-2.1 3-4.2h-2.7c-.5 1.6-1.9 3-3.1 3.1V7.1H8.3v5.5c-1.4-.3-3.2-2-3.3-5.5H3.5Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12a8.7 8.7 0 0 1-9 8.5 9.8 9.8 0 0 1-4.4-1l-4 1.2 1.2-3.6A8.1 8.1 0 0 1 3 12a8.7 8.7 0 0 1 9-8.5A8.7 8.7 0 0 1 21 12Z" />
      <path d="M8.2 11.9h.1M12 11.9h.1M15.8 11.9h.1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { contacts } = siteContent;
  const links = [
    { label: "Telegram", href: contacts.telegram, icon: <TelegramIcon /> },
    { label: "WhatsApp", href: contacts.whatsapp, icon: <WhatsAppIcon /> },
    { label: "Max", href: contacts.max, icon: <MaxIcon /> },
    { label: "VK", href: contacts.vk, icon: <VkIcon /> },
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

  return (
    <div className={`${styles.floating} ${isRevealed ? styles.revealed : ""} ${isScrolling ? styles.scrolling : ""} ${isOpen ? styles.open : ""}`}>
      <nav className={styles.list} aria-label="Быстрые контакты" aria-hidden={!isOpen ? "true" : undefined}>
        {links.map((link) => (
          <a className={styles.link} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} data-label={link.label} key={link.label} onClick={() => setIsOpen(false)}>
            {link.icon}
          </a>
        ))}
      </nav>

      <button className={styles.trigger} type="button" aria-label={isOpen ? "Закрыть быстрые контакты" : "Открыть быстрые контакты"} aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
        <span className={styles.triggerIconChat}>
          <ChatIcon />
        </span>
        <span className={styles.triggerIconClose}>
          <CloseIcon />
        </span>
      </button>
    </div>
  );
}
