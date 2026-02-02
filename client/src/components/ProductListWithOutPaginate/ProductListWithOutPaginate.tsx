"use client";

import { useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductListWithOutPaginate.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slices/productSlice";

interface ProductListProps {
  limit?: number;
  withPagination?: boolean;
}

export default function ProductListWithOutPaginate({
  limit = 8,
  withPagination = false,
}: ProductListProps) {
  const dispatch = useAppDispatch();

  const { items, loading, error, page, totalPages } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 8 }));
  }, [dispatch, limit]);

  const handlePageClick = (newPage: number) => {
    dispatch(getProducts({ page: newPage, limit }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.productList}>
      <section className={styles.container}>
        <h1 className={styles.title}>Our Products</h1>

        <div className={styles.productsGrid}>
          {items.map((product: any) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>

        {withPagination && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => handlePageClick(page - 1)}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={p === page ? styles.activePage : ""}
                onClick={() => handlePageClick(p)}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => handlePageClick(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
