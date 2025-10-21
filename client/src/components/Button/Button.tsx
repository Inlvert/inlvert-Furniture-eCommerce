"use client";

import styles from "./Button.module.scss";

export default function Button({text}: { text: string }) {
  return <h1 className={styles.btn}>{text}</h1>;
}
