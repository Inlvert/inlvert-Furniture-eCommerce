"use client";

import { useSelector } from "react-redux";
import styles from "./CompareTable.module.scss";
import CompareItem from "../CompareItem/CompareItem";
import { Product } from "@/types/product.type";
import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/slices/cartProductSlise";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import { removeProductFromCompare } from "@/redux/slices/compareSlice";

export default function CompareTable() {
  const dispatch = useAppDispatch();
  const items: Product[] =
    useSelector((state: any) => state.compare?.products) || [];

  if (items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.empty}>No products to compare</p>
      </div>
    );
  }

  const productGridClass = classNames(styles.initialGrid, {
    [styles.productGrid1]: items.length === 1,
    [styles.productGrid2]: items.length === 2,
    [styles.productGrid3]: items.length === 3,
    [styles.productGrid4]: items.length === 4,
  });

  const rows = [
    { label: "General", type: "section" },

    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Stock", key: "stock" },
    { label: "SKU", key: "sku" },
    { label: "Rating", key: "averageRating" },
    { label: "Reviews", key: "reviewsCount" },

    { label: "Product", type: "section" },
    { label: "Description", key: "description" },
    { label: "", key: "button" },
  ];

  const handleAddToCart = (items: any) => {
    dispatch(
      addProductToCart({
        productId: items._id,
        quantity: 1,
      }),
    );
  };

  const handleRemoveFromCompare = (productId: string) => {
    dispatch(removeProductFromCompare(productId));
  };

  const value = (item: any, key: string) => {
    if (key === "price") return `$${item.price}`;
    if (key === "averageRating") return `⭐ ${item.averageRating ?? 0}`;
    if (key === "button")
      return (
        <ButtonAddToCart
          onClick={() => handleAddToCart(item)}
          text="Add To Cart"
        />
      );

    return item[key] ?? "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={productGridClass}>
        {/* HEADER */}
        <div className={styles.headerTitle}>
          <h1 className={styles.headerText1}>
            Go to Product page for more Products
          </h1>
          <Link href="/shop" className={styles.headerLink}>
            View More
          </Link>
        </div>

        {items.map((item) => (
          <CompareItem
            key={item._id}
            item={item}
            handleRemoveFromCompare={handleRemoveFromCompare}
          />
        ))}

        {rows.map((row, i) => {
          // if ((row as any).type === "section") {
          //   return (
          //     <div key={i} className={styles.section}>
          //       {row.label}
          //     </div>
          //   );
          // }

          return (
            <React.Fragment key={`${row.key}-${i}`}>
              <div className={styles.label}>{row.label}</div>

              {items.map((item) => (
                <div key={item._id + row.key} className={styles.value}>
                  {value(item, row.key!)}
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
