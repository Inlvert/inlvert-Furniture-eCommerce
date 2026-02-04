"use client";

import { useState } from "react";
import styles from "./ProductDetailsView.module.scss";
import ButtonAddToCart from "@/components/ButtonAddToCart/ButtonAddToCart";
import placeholderImg from "@/assets/placeholder.png";

type Product = {
  _id: string;
  name: string;
  description: string;
  smallDescription: string;
  price: number;
  images?: string[];
  category: string;
  sizes?: string[];
  colors?: string[];
  sku?: string;
  stock?: number;
  tags?: string[];
};

export default function ProductDetailsView({ product }: { product: Product }) {
  const images = product.images?.length
    ? product.images.map(
        (img) => `http://localhost:5000/images/${encodeURIComponent(img)}`
      )
    : [placeholderImg.src];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.gallery}>
          
          <div className={styles.thumbsCol}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} ${i}`}
                className={`${styles.thumb} ${
                  src === activeImage ? styles.activeThumb : ""
                }`}
                onClick={() => setActiveImage(src)}
              />
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={activeImage} alt={product.name} />
          </div>

        </div>
        
        <div className={styles.infoCol}>
          <h1>{product.name}</h1>

          <div className={styles.price}>${product.price}</div>

          <p className={styles.description}>{product.smallDescription}</p>

          <ButtonAddToCart text="Add to cart" onClick={() => {}} />
        </div>

      </div>
    </div>
  );
}
