"use client";

import { use, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slices/productSlice";

export default function ProductList() {
  const { products, loading, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const foundProducts = products.map((product) => (
    <ProductItem key={product._id} product={product} />
  ));

  return (
    <div className={`${styles.container} w-full max-w-[1440px] h-auto `}>
      <h1 className={styles.title}>Our Products</h1>
      {foundProducts}
      {/* Product items would be rendered here */}
    </div>
  );
}
