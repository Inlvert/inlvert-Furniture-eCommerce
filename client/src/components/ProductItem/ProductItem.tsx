"use client";

import styles from "./ProductItem.module.scss";
import placeholderImg from "@/assets/placeholder.png";

type Product = {
  name: string;
  description: string;
  price: number;
  images?: string[];
};

export default function ProductItem({ product }: { product: Product }) {
  const imageSrc =
    product.images?.length
      ? `http://localhost:5000/images/${encodeURIComponent(product.images[0])}`
      : placeholderImg.src;

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imageSrc} alt={product.name} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
        </div>
      </div>
    </article>
  );
}
