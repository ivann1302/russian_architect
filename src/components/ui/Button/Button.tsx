import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "gold" | "green" | "light" | "outlineLight" | "ghostLight";
type ButtonSize = "sm" | "md" | "lg";
type ButtonFont = "body" | "heading";
type ButtonWeight = "regular" | "medium" | "semibold";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  font?: ButtonFont;
  weight?: ButtonWeight;
  uppercase?: boolean;
  fullWidth?: boolean;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: CSSProperties;
};

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
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
}: ButtonProps) {
  const buttonClassName = cx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`font-${font}`],
    styles[`weight-${weight}`],
    uppercase && styles.uppercase,
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      <span className={styles.label}>{children}</span>
      {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <a className={buttonClassName} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={buttonClassName} type="button" {...buttonProps}>
      {content}
    </button>
  );
}
