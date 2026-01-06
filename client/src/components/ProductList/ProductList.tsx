"use client";

import { useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slices/productSlice";

export default function ProductList() {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
