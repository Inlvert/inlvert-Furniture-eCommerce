"use client";

import Link from "next/link";
import styles from "./CompareItem.module.scss";
import placeholderImg from "@/assets/placeholder.png";
import { Product } from "@/types/product.type";

type Props = {
  item: Product;
};

export default function CompareItem({
  item,
  handleRemoveFromCompare,
}: Props & { handleRemoveFromCompare: (id: string) => void }) {
  const imageSrc =
    Array.isArray(item.images) && item.images.length > 0
      ? `http://localhost:5000/images/${encodeURIComponent(item.images[0])}`
      : placeholderImg.src;

  return (
    <div className={styles.card}>
      <Link href={`/products/${item._id}`}>
        <img src={imageSrc} alt={item.name} className={styles.image} />
        <div className={styles.info}>
          <h3 className={styles.name}>{item.name}</h3>

          <p className={styles.price}>${item.price}</p>

          <div className={styles.ratingContainer}>
            <span className={styles.rating}>{item.averageRating ?? 0} ⭐</span>
            <div className={styles.divider}></div>
            <p className={styles.reviews}>{item.reviewsCount ?? 0} Reviews</p>
          </div>
        </div>
      </Link>
      {/* <Image
        src={imageSrc}
        alt={item.name}
        width={300}
        height={50}
      /> */}

      <button
        className={styles.closeBtn}
        onClick={() => handleRemoveFromCompare(item._id)}
      >
        ✕
      </button>
    </div>
  );
}
