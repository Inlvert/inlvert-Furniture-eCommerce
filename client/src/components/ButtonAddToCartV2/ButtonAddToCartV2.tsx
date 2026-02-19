"use client";

import styles from "./ButtonAddToCartV2.module.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonAddToCartV2({text, onClick }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}