"use client";
import styles from "./Feature.module.scss";

export default function Feature() {
  return (
    <div className={styles.cover}>
      <div className={styles.container}>
        <img src="trophy1.svg" alt="trophy1" />
        <div className={styles.text}>
          <h1 className={styles.textH1}>High Quality</h1>
          <h2 className={styles.textP}>crafted from top materials</h2>
        </div>
      </div>
      <div className={styles.container}>
        <img src="Vector.svg" alt="Vector" />
        <div className={styles.text}>
          <h1 className={styles.textH1}>Warranty Protection</h1>
          <h2 className={styles.textP}>Over 2 years</h2>
        </div>
      </div>
      <div className={styles.container}>
        <img src="shipping.svg" alt="shipping" />
        <div className={styles.text}>
          <h1 className={styles.textH1}>Free Shipping</h1>
          <h2 className={styles.textP}>On orders over $100</h2>
        </div>
      </div>
      <div className={styles.container}>
        <img src="customer-support.svg" alt="customer-support" />
        <div className={styles.text}>
          <h1 className={styles.textH1}>24 / 7 Support</h1>
          <h2 className={styles.textP}>Dedicated support</h2>
        </div>
      </div>
    </div>
  );
}