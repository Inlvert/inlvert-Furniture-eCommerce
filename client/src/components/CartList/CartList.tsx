"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "./CartList.module.scss";
import { useEffect, useMemo } from "react";
import {
  getProductsInCart,
  updateCartProductQuantity,
  removeProductFromCart,
} from "@/redux/slices/cartProductSlise";

export default function CartList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.cartProduct);

  useEffect(() => {
    dispatch(getProductsInCart());
  }, [dispatch]);

  // Сумарна ціна з захистом від NaN
  const total = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + (i.productId?.price || 0) * (i.quantity || 0),
        0
      ),
    [items]
  );

  return (
    <div className={styles.layout}>
      {/* LEFT — TABLE */}
      <div className={styles.table}>
        <div className={styles.head}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          <div />
        </div>

        {items.map((item) => {
          // Пропускаємо елементи без productId
          if (!item.productId) return null;

          const img = item.productId.images?.[0]
            ? `http://localhost:5000/images/${item.productId.images[0]}`
            : "/placeholder.png";

          const subtotal = (item.productId.price || 0) * (item.quantity || 0);

          return (
            <div key={item.productId._id} className={styles.row}>
              <div className={styles.productCell}>
                <img src={img} alt={item.productId.name} />
                <span>{item.productId.name}</span>
              </div>

              <div>
                Rs.{" "}
                {item.productId.price != null
                  ? item.productId.price.toLocaleString()
                  : "—"}
              </div>

              <div className={styles.qty}>
                <button
                  onClick={() =>
                    dispatch(
                      updateCartProductQuantity({
                        productId: item.productId._id,
                        quantity: Math.max(1, item.quantity - 1), // мінімум 1
                      })
                    )
                  }
                >
                  −
                </button>

                <span>{item.quantity || 0}</span>

                <button
                  onClick={() =>
                    dispatch(
                      updateCartProductQuantity({
                        productId: item.productId._id,
                        quantity: (item.quantity || 0) + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>

              <div>Rs. {subtotal.toLocaleString()}</div>

              <button
                className={styles.remove}
                onClick={() =>
                  dispatch(removeProductFromCart(item.productId._id))
                }
              >
                <img src="/delete.svg" alt="Remove item" />
              </button>
            </div>
          );
        })}
      </div>

      {/* RIGHT — TOTALS */}
      <div className={styles.totals}>
        <h3>Cart Totals</h3>

        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>

        <div className={styles.totalRowBig}>
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>

        <button className={styles.checkout}>Check Out</button>
      </div>
    </div>
  );
}
