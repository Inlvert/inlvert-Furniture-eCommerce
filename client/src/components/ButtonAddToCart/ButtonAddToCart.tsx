"use client";

import styles from "./ButtonAddToCart.module.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonAddToCart({text, onClick }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}