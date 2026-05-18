"use client";

import { useSelector } from "react-redux";
import styles from "./CompareTable.module.scss";
import CompareItem from "../CompareItem/CompareItem";
import { Product } from "@/types/product.type";
import React, { lazy } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/slices/cartProductSlise";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import { removeProductFromCompare } from "@/redux/slices/compareSlice";
import { rows } from "./rows";

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

  const value = (item: any, key: string, type: string) => {
    const currentValue = item[key];
    if (typeof currentValue === "boolean") {
      return currentValue ? "Yes" : "No";
    }

    if (
      key === "height" ||
      key === "width" ||
      key === "depth" ||
      key === "seatHeight" ||
      key === "legHeight" ||
      key === "maximumLoadCapacity" ||
      key === "weight"
    ) {
      if (key === "maximumLoadCapacity" || key === "weight") {
        return `${item[key] ?? 0} KG`;
      }
      return `${item[key] ?? 0} sm`;
    }
    if (type === "section") return "";
    if (key === "price") return `$${item.price}`;
    if (key === "averageRating") return `⭐ ${item.averageRating ?? 0}`;
    if (key === "warrantySummary")
      return `${item.warrantySummary ?? 0} Year Manufacturing Warranty`;
    if (key ==="domesticWarranty")
      return `${item.domesticWarranty ?? 0} months`;
    if (key === "button")
      return (
        <ButtonAddToCart
          onClick={() => handleAddToCart(item)}
          text="Add To Cart"
        />
      );

    return item[key] ?? "-";
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
          if (row.type === "section") {
            return (
              <React.Fragment key={i}>
                <div className={styles.section}>{row.label}</div>

                {items.map((item) => (
                  <div
                    key={item._id + row.label}
                    className={styles.sectionSpacer}
                  />
                ))}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={`${row.key}-${i}`}>
              <div className={styles.label}>{row.label}</div>

              {items.map((item) => (
                <div key={item._id + row.key} className={styles.value}>
                  <div>{value(item, row.key!, row.type!)}</div>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
