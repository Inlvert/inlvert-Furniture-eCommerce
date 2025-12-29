"use client";

import styles from "./ProductItem.module.scss";
import placeholderImg from "@/assets/placeholder.png";

export default function ProductItem({ product }: { product: any }) {
  return (
    <div className={styles.container}>
      <img
        src={
          product.images && product.images.length > 0
            ? `http://localhost:5000/images/${encodeURIComponent(product.images[0])}`
            : placeholderImg.src
        }
        alt={product.name}
      />
      <h1 className={styles.text}>{product.name}</h1>
      <p className={styles.text}>{product.description}</p>
      <p className={styles.text}>Price: ${product.price}</p>
      {/* Product item details would go here */}
    </div>
  );
}
