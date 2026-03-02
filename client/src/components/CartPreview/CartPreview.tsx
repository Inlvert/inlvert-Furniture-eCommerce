"use client";

import Image from "next/image";
import styles from "./CartPreview.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hidePreview } from "@/redux/slices/cartPreviewSlice";
import { useEffect } from "react";

export default function CartPreview() {
  const dispatch = useAppDispatch();
  const { isOpen, product } = useAppSelector((state) => state.cartPreview);

  // auto close after 4 sec
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      dispatch(hidePreview());
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, dispatch]);

  if (!product) return null;

  return (
    <>
      {/* overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={() => dispatch(hidePreview())}
      />

      {/* sidebar */}
      <div className={`${styles.preview} ${isOpen ? styles.open : ""}`}>
        <h3>Shopping Cart</h3>

        <div className={styles.card}>
          {/* <Image
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
            unoptimized
          /> */}
          <img src={product.image} alt={product.title} className={styles.image} />

          <div>
            <p>{product.title}</p>
            <span>${product.price}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button>Cart</button>
          <button className={styles.checkout}>Checkout</button>
        </div>
      </div>
    </>
  );
}
