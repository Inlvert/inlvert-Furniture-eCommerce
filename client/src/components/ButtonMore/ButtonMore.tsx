'use client';

import styles from "./ButtonMore.module.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonMore({ text, onClick }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}