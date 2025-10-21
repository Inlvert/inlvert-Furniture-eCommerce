"use client";

import Button from "../Button/Button";
import styles from "./ArticleBox.module.scss";

export default function ArticleBox() {
  return (
    <div className={styles.box}>
      <h2 className={`${styles.text1}`}>New Arrival</h2>
      <h3 className={`${styles.text2}`}>Discover Our <br /> New Collection </h3>
      <p className={`${styles.text3}`}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Odio
        accusamus possimus quam id cumque, labore,
      </p>
      <Button text={"BUY NOW"}/>
    </div>
  );
}
