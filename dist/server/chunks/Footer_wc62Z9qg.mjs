import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { MessageCircle, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { s as styles, a as styles$1, b as styles$2 } from './index.b9defd66_BfT1t3Fr.mjs';

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Button({
  children,
  variant = "gold",
  size = "md",
  font = "body",
  weight = "semibold",
  uppercase = true,
  fullWidth = false,
  className,
  iconLeft,
  iconRight,
  ...props
}) {
  const buttonClassName = cx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`font-${font}`],
    styles[`weight-${weight}`],
    uppercase && styles.uppercase,
    fullWidth && styles.fullWidth,
    className
  );
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    iconLeft ? /* @__PURE__ */ jsx("span", { className: styles.icon, children: iconLeft }) : null,
    /* @__PURE__ */ jsx("span", { className: styles.label, children }),
    iconRight ? /* @__PURE__ */ jsx("span", { className: styles.icon, children: iconRight }) : null
  ] });
  if ("href" in props && props.href) {
    const anchorProps = props;
    return /* @__PURE__ */ jsx("a", { className: buttonClassName, ...anchorProps, children: content });
  }
  const buttonProps = props;
  return /* @__PURE__ */ jsx("button", { className: buttonClassName, type: "button", ...buttonProps, children: content });
}

const siteContent = {
  company: {
    name: "Русский Зодчий",
    legalName: "ИП Румянцев Роман Ростиславович"},
  contacts: {
    phone: "89772843073",
    phoneLabel: "8 977 284-30-73",
    email: "skrusskizodchy@yandex.ru",
    telegram: "http://t.me/skrusskizodchy",
    whatsapp: "https://wa.me/79919332211",
    max: "https://max.ru/u/f9LHodD0cOKLUm9PrLo-SaJ0jVnYhgRGNpX2v5aJ7leQL7KRZIE_C28jFuI",
    vk: "https://vk.ru/russianzodchy",
    instagram: "https://www.instagram.com/sk_russian_zodchy?igsh=MWU3cGpqbmttYm9idQ==",
    youtube: "https://youtube.com/channel/UCznNU15a-lrxZ4rnxHhkKQA?si=wMv1z1iS0yEDZM7m"
  },
  hero: {
    label: "Москва и Московская область",
    title: "Ремонт квартир и домов под ключ",
    text: "Реализовали более 640 объектов в Москве и области",
    primaryCta: "Получить консультацию",
    secondaryCta: "Смотреть проекты"
  },
  heroBenefits: [
    "Страхуем объекты и гражданскую ответственность с гарантией до 3х лет",
    "Мастера с инженерным образованием и стажем от 5 лет",
    "Поэтапная оплата по факту выполненных работ",
    "Качество работ проверяет технический надзор"
  ],
  stats: {
    image: {
      src: "/assets/hero/hero-bg.png",
      alt: "Современный интерьер квартиры после ремонта под ключ"
    },
    items: [
      {
        value: "7",
        label: "лет работы в сфере ремонта"
      },
      {
        value: "120",
        label: "семей стали жить с комфортом"
      },
      {
        value: "105",
        label: "выполненных объектов"
      },
      {
        value: "89%",
        label: "клиентов обращаются по рекомендации"
      }
    ]
  },
  approach: {
    title: "Реализуем проекты любой сложности под ключ",
    text: "Единый подрядчик и полная ответственность за результат от команды с 10-летним стажем.",
    items: [
      {
        title: "Прозрачность бюджета и сроков",
        text: "Заранее фиксируем смету и календарный план. Без скрытых расходов и неожиданных задержек: вы понимаете бюджет и сроки до старта работ."
      },
      {
        title: "Полный цикл от идеи до готового интерьера",
        text: "Берем на себя инженерное проектирование, дизайн-проект, подбор материалов и мебели, закупку и реализацию ремонта."
      },
      {
        title: "Контроль качества на каждом этапе",
        text: "Работы идут под надзором прораба и технического директора. Вы получаете регулярные отчеты, а строительные вопросы остаются на нашей стороне."
      },
      {
        title: "Интерьер, продуманный до мелочей",
        text: "Прорабатываем материалы, свет, фактуры, мебель и сценарии жизни в пространстве, чтобы ремонт был не только красивым, но и функциональным."
      }
    ]
  },
  servicesSection: {
    title: "Работаем с квартирами, домами и комплексными интерьерными проектами",
    text: "Подбираем формат работ под задачу: от отдельного ремонта до полного цикла с проектированием, комплектацией и сопровождением.",
    image: {
      src: "/assets/hero/hero-bg.png",
      alt: "Современный интерьер кухни-гостиной с продуманной отделкой"
    },
    items: [
      {
        title: "Ремонт квартир",
        text: "Полный ремонт квартир в новостройках и вторичном фонде: от черновых работ до финальной комплектации."
      },
      {
        title: "Ремонт домов",
        text: "Интерьерные и строительные работы для частных домов с учетом инженерии, планировки и сценариев жизни."
      },
      {
        title: "Дизайн-проект и инженерия",
        text: "Планировочные решения, рабочая документация, электрика, сантехника, свет и технические узлы."
      },
      {
        title: "Комплектация и сопровождение",
        text: "Подбор материалов, мебели, света и закупка с контролем сроков поставки и соответствия проекту."
      }
    ]
  },
  portfolio: {
    title: "Портфолио работ",
    items: [
      {
        title: "ЖК Левел Лесной",
        days: "150 дней",
        area: "124 м²",
        images: [
          {
            src: "/assets/portfolio/vk/processed/vk-96-01.jpg",
            alt: "Дизайнерский ремонт под ключ в ЖК Левел Лесной"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-96-02.jpg",
            alt: "Детали ремонта в ЖК Левел Лесной"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-96-03.jpg",
            alt: "Интерьер проекта ЖК Левел Лесной"
          }
        ]
      },
      {
        title: "Квартира под ключ",
        days: "120 дней",
        area: "69 м²",
        images: [
          {
            src: "/assets/portfolio/vk/processed/vk-52-01.jpg",
            alt: "Двухкомнатная квартира под ключ 69 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-52-02.jpg",
            alt: "Фото ремонта двухкомнатной квартиры 69 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-52-03.jpg",
            alt: "Интерьер двухкомнатной квартиры после ремонта"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-52-04.jpg",
            alt: "Отделка в двухкомнатной квартире 69 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-52-05.jpg",
            alt: "Ремонт квартиры под ключ 69 квадратных метров"
          }
        ]
      },
      {
        title: "Квартира за 3 месяца",
        days: "90 дней",
        area: "58 м²",
        images: [
          {
            src: "/assets/portfolio/vk/processed/vk-50-01.jpg",
            alt: "Двухкомнатная квартира 58 квадратных метров под ключ"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-50-02.jpg",
            alt: "Фото ремонта двухкомнатной квартиры 58 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-50-03.jpg",
            alt: "Интерьер двухкомнатной квартиры 58 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-50-04.jpg",
            alt: "Отделочные работы в квартире 58 квадратных метров"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-50-05.jpg",
            alt: "Ремонт квартиры 58 квадратных метров под ключ"
          }
        ]
      },
      {
        title: "Фото с объекта",
        days: "март 2026",
        area: "3 фото",
        images: [
          {
            src: "/assets/portfolio/vk/processed/vk-97-01.jpg",
            alt: "Фото работ со страницы Русский Зодчий"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-97-02.jpg",
            alt: "Фото выполненных работ Русский Зодчий"
          },
          {
            src: "/assets/portfolio/vk/processed/vk-97-03.jpg",
            alt: "Фотография объекта Русский Зодчий"
          }
        ]
      }
    ]
  },
  workProcess: {
    title: "Как мы работаем",
    text: "Ведем проект последовательно: от планировки и визуальной концепции до рабочей документации, комплектации и понятной сметы.",
    items: [
      {
        title: "Планировочные решения",
        text: "Спроектируем ваше будущее пространство и предложим улучшенные варианты для удобного и комфортного проживания."
      },
      {
        title: "Эскизный проект",
        text: "Разработаем стилистическое решение и концепцию интерьера, предоставим мудборды и 3D-визуализации пространства для полного представления."
      },
      {
        title: "Рабочий проект",
        text: "Начертим более 30 чертежей и планов, по которым строители сделают именно такой ремонт, как задумано изначально, и минимизируют ошибки."
      },
      {
        title: "Комплектация",
        text: "Подберем материалы и предоставим список поставщиков, съездим с вами в салоны для выбора нужных позиций."
      },
      {
        title: "Смета на ремонт",
        text: "Детально рассчитаем стоимость будущего ремонта по нашему проекту, чтобы заранее понимать бюджет и этапы работ."
      }
    ]
  },
  founderSection: {
    title: "Профессиональная команда",
    name: "Роман Румянцев",
    role: "Основатель компании",
    text: "Мы выстроили систему, где процесс понятен: ремонт квартир и домов в Москве и МО идет с прозрачной коммуникацией, контролем качества и ответственностью за результат.",
    quote: "ИП Румянцев Роман Ростиславович"},
  reviewsSection: {
    title: "Что говорят наши заказчики",
    items: [
      {
        src: "/assets/reviews/review-20260711115917.webp",
        alt: "Скриншот отзыва клиента о ремонте от Русского Зодчего"
      },
      {
        src: "/assets/reviews/review-20260711115930.webp",
        alt: "Скриншот отзыва клиента о работе команды Русский Зодчий"
      },
      {
        src: "/assets/reviews/review-20260711115943.webp",
        alt: "Скриншот отзыва заказчика о ремонте квартиры"
      },
      {
        src: "/assets/reviews/review-20260711115953.webp",
        alt: "Скриншот отзыва заказчика о ремонте под ключ"
      },
      {
        src: "/assets/reviews/review-20260711120017.webp",
        alt: "Скриншот отзыва клиента о качестве ремонта"
      },
      {
        src: "/assets/reviews/review-20260711120031.webp",
        alt: "Скриншот отзыва клиента о сотрудничестве с Русским Зодчим"
      },
      {
        src: "/assets/reviews/review-20260711120114.webp",
        alt: "Скриншот отзыва клиента о выполненных работах"
      }
    ]
  },
  ctaSection: {
    title: "Готовы обсудить проект?",
    text: "Оставьте контакт - вернемся с вопросами по объекту и первым ориентиром.",
    image: {
      src: "/assets/rrr-interier-edited.jpg",
      alt: "Светлый интерьер спальни после ремонта"
    },
    benefits: ["бюджет", "сроки", "этапы работ"],
    form: {
      namePlaceholder: "Имя",
      phonePlaceholder: "+7 (000) 000-00-00",
      consent: "Согласен на обработку персональных данных",
      submit: "Получить консультацию"
    }
  },
  nav: [
    { label: "Услуги", href: "#services" },
    { label: "Проекты", href: "#projects" },
    { label: "Процесс", href: "#process" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" }
  ]};

function Header() {
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
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `${styles$1.header} ${isScrolled ? styles$1.scrolled : ""} ${isMenuOpen ? `${styles$1.menuOpen} site-menu-open` : ""}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.inner, children: [
          /* @__PURE__ */ jsx("a", { className: styles$1.brand, href: "/", "aria-label": `${siteContent.company.name}, на главную`, onClick: closeMenu, children: /* @__PURE__ */ jsx("img", { className: styles$1.logo, src: "/assets/rrr-logo.png", alt: "", width: "180", height: "75" }) }),
          /* @__PURE__ */ jsx("nav", { className: styles$1.nav, "aria-label": "Основная навигация", children: siteContent.nav.map((item) => /* @__PURE__ */ jsx("a", { className: styles$1.navLink, href: item.href, children: item.label }, item.href)) }),
          /* @__PURE__ */ jsxs("div", { className: styles$1.actions, children: [
            /* @__PURE__ */ jsx("a", { className: styles$1.phone, href: `tel:+7${siteContent.contacts.phone.slice(1)}`, children: siteContent.contacts.phoneLabel }),
            /* @__PURE__ */ jsx(Button, { href: siteContent.contacts.telegram, variant: "gold", size: "sm", iconLeft: /* @__PURE__ */ jsx(MessageCircle, { "aria-hidden": "true" }), children: "Получить консультацию" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: styles$1.menuButton,
              type: "button",
              "aria-label": isMenuOpen ? "Закрыть меню" : "Открыть меню",
              "aria-expanded": isMenuOpen,
              "aria-controls": "mobile-menu",
              onClick: () => setIsMenuOpen((value) => !value),
              children: isMenuOpen ? /* @__PURE__ */ jsx(X, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Menu, { "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.mobilePanel, id: "mobile-menu", "data-open": isMenuOpen, children: [
          /* @__PURE__ */ jsx("a", { className: styles$1.mobileBrand, href: "/", "aria-label": `${siteContent.company.name}, на главную`, onClick: closeMenu, children: /* @__PURE__ */ jsx("img", { className: styles$1.mobileLogo, src: "/assets/rrr-logo.png", alt: "", width: "180", height: "75" }) }),
          /* @__PURE__ */ jsx("nav", { className: styles$1.mobileNav, "aria-label": "Мобильная навигация", children: siteContent.nav.map((item) => /* @__PURE__ */ jsx("a", { className: styles$1.mobileLink, href: item.href, onClick: closeMenu, children: item.label }, item.href)) }),
          /* @__PURE__ */ jsxs("div", { className: styles$1.mobileActions, children: [
            /* @__PURE__ */ jsx(Button, { href: siteContent.contacts.telegram, variant: "gold", size: "md", fullWidth: true, iconLeft: /* @__PURE__ */ jsx(MessageCircle, { "aria-hidden": "true" }), children: "Получить консультацию" }),
            /* @__PURE__ */ jsx(Button, { href: `tel:+7${siteContent.contacts.phone.slice(1)}`, variant: "outlineLight", size: "md", fullWidth: true, children: "Позвонить" })
          ] })
        ] })
      ]
    }
  );
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
function InstagramIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7.5 2.8h9c2.6 0 4.7 2.1 4.7 4.7v9c0 2.6-2.1 4.7-4.7 4.7h-9a4.7 4.7 0 0 1-4.7-4.7v-9c0-2.6 2.1-4.7 4.7-4.7Zm0 2A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm4.5 3.4a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm4.1-2.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" }) });
}
function YoutubeIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M21.4 7.2c-.2-.9-.9-1.6-1.8-1.8C18 5 12 5 12 5s-6 0-7.6.4c-.9.2-1.6.9-1.8 1.8C2.2 8.8 2.2 12 2.2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C6 19 12 19 12 19s6 0 7.6-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z" }) });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { company, contacts } = siteContent;
  const socialLinks = [
    {
      label: "Telegram",
      href: contacts.telegram,
      icon: /* @__PURE__ */ jsx(TelegramIcon, {})
    },
    {
      label: "WhatsApp",
      href: contacts.whatsapp,
      icon: /* @__PURE__ */ jsx(WhatsAppIcon, {})
    },
    {
      label: "Max",
      href: contacts.max,
      icon: /* @__PURE__ */ jsx(MaxIcon, {})
    },
    {
      label: "VK",
      href: contacts.vk,
      icon: /* @__PURE__ */ jsx(VkIcon, {})
    },
    {
      label: "Instagram*",
      href: contacts.instagram,
      icon: /* @__PURE__ */ jsx(InstagramIcon, {})
    },
    {
      label: "YouTube",
      href: contacts.youtube,
      icon: /* @__PURE__ */ jsx(YoutubeIcon, {})
    }
  ];
  return /* @__PURE__ */ jsx("footer", { className: styles$2.footer, children: /* @__PURE__ */ jsxs("div", { className: styles$2.inner, children: [
    /* @__PURE__ */ jsx("a", { className: styles$2.brand, href: "/", "aria-label": `${company.name}, на главную`, children: /* @__PURE__ */ jsx("img", { className: styles$2.logo, src: "/assets/rrr-logo.png", alt: "", width: "180", height: "75" }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.company, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        year,
        " ",
        company.name
      ] }),
      /* @__PURE__ */ jsx("span", { children: company.legalName })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.meta, children: [
      /* @__PURE__ */ jsx("a", { href: `tel:+7${contacts.phone.replace(/\D/g, "").replace(/^8/, "")}`, children: contacts.phoneLabel }),
      /* @__PURE__ */ jsx("a", { href: `mailto:${contacts.email}`, children: contacts.email }),
      /* @__PURE__ */ jsx("a", { href: "/politika", children: "Политика обработки персональных данных" }),
      /* @__PURE__ */ jsxs("span", { className: styles$2.credit, children: [
        "Сайт разработан",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://project42-studio.ru", target: "_blank", rel: "noreferrer", children: "Project 42" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: styles$2.socials, "aria-label": "Социальные сети", children: socialLinks.map((social) => /* @__PURE__ */ jsx("a", { className: styles$2.socialLink, href: social.href, target: "_blank", rel: "noreferrer", "aria-label": social.label, children: social.icon }, social.label)) }),
    /* @__PURE__ */ jsx("p", { className: styles$2.disclaimer, children: "*Instagram принадлежит компании Meta, деятельность которой признана экстремистской и запрещена на территории РФ." })
  ] }) });
}

export { Button as B, Footer as F, Header as H, siteContent as s };
