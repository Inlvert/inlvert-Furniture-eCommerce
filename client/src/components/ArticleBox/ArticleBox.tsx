"use client";

import styles from "./ArticleBox.module.scss";

export default function ArticleBox() {
  return (
    <div className={styles.box}>
      <h2 className={`${styles.text1} text-red-600`}>New Arrival</h2>
      <h1 className="text-4xl font-bold">Luxury Sofa Collection</h1>
      <p className="mt-4 text-gray-700">
        Discover our exclusive new line of modern furniture that redefines
        comfort.
      </p>
    </div>
  );
}
