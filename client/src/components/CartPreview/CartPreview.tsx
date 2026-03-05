"use client";

import styles from "./CartPreview.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hidePreview } from "@/redux/slices/cartPreviewSlice";
import { removeProductFromCart } from "@/redux/slices/cartProductSlise";
import { useEffect, useMemo } from "react";

export default function CartPreview() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cartPreview);
  const { items } = useAppSelector((state) => state.cartProduct);
  
  const total = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + (i.productId?.price || 0) * (i.quantity || 0),
        0,
      ),
    [items],
  );
  
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      dispatch(hidePreview());
    }, 400000);

    return () => clearTimeout(timer);
  }, [isOpen, dispatch]);

  if (!items || items.length === 0) return null;


  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={() => dispatch(hidePreview())}
      />

      <div className={`${styles.preview} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Shopping Cart</h3>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch(hidePreview())}
          >
            ✕
          </button>
        </div>

        <div className={styles.card}>
          {items.map((item, index) => {
            const product = item.productId;
            if (!product) return null;

            const img = product.images?.[0]
              ? `http://localhost:5000/images/${product.images[0]}`
              : "/placeholder.png";

            return (
              <div key={product._id || index} className={styles.item}>
                <img src={img} alt={product.name} className={styles.image} />

                <div className={styles.info}>
                  <p>{product.name}</p>
                  <span>
                    {item.quantity} × ${product.price}
                  </span>
                </div>

                <button
                  className={styles.deleteBtn}
                  onClick={() => dispatch(removeProductFromCart(product._id))}
                >
                  🗑
                </button>
              </div>
            );
          })}

          <p className={styles.total}>Total: ${total}</p>

          <button className={styles.checkout}>Checkout</button>
        </div>
      </div>
    </>
  );
}
