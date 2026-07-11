import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";
import styles from "./Header.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? `${styles.menuOpen} site-menu-open` : ""}`}
    >
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label={`${siteContent.company.name}, на главную`} onClick={closeMenu}>
          <img className={styles.logo} src="/assets/rrr-logo.png" alt="" width="180" height="75" />
        </a>

        <nav className={styles.nav} aria-label="Основная навигация">
          {siteContent.nav.map((item) => (
            <a className={styles.navLink} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={`tel:+7${siteContent.contacts.phone.slice(1)}`}>
            {siteContent.contacts.phoneLabel}
          </a>
          <Button href={siteContent.contacts.telegram} variant="gold" size="sm" iconLeft={<MessageCircle aria-hidden="true" />}>
            Получить консультацию
          </Button>
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className={styles.mobilePanel} id="mobile-menu" data-open={isMenuOpen}>
        <a className={styles.mobileBrand} href="/" aria-label={`${siteContent.company.name}, на главную`} onClick={closeMenu}>
          <img className={styles.mobileLogo} src="/assets/rrr-logo.png" alt="" width="180" height="75" />
        </a>
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {siteContent.nav.map((item) => (
            <a className={styles.mobileLink} href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Button href={siteContent.contacts.telegram} variant="gold" size="md" fullWidth iconLeft={<MessageCircle aria-hidden="true" />}>
            Получить консультацию
          </Button>
          <Button href={`tel:+7${siteContent.contacts.phone.slice(1)}`} variant="outlineLight" size="md" fullWidth>
            Позвонить
          </Button>
        </div>
      </div>
    </header>
  );
}
