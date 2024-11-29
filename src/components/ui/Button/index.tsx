"use client";
import { HTMLAttributeAnchorTarget } from "react";
import Link from "next/link";
import styles from "./style.module.scss";

type ButtonType = "small" | "medium" | "large";

interface ButtonProps {
  type?: ButtonType;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  type,
  href,
  onClick,
  target,
  className,
  disabled,
}: ButtonProps) => {
  return href ? (
    <Link
      href={href}
      target={target ? target : "_self"}
      className={`${styles.button} ${
        type === "small"
          ? styles.button__small
          : type === "large"
          ? styles.button__large
          : styles.button__medium
      } ${className ? className : ""}`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.button__disabled : ""} ${
        type === "small"
          ? styles.button__small
          : type === "large"
          ? styles.button__large
          : styles.button__medium
      } ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};
