"use client";

import Link from "next/link";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import styles from "./ProductItem.module.scss";
import placeholderImg from "@/assets/placeholder.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProductToCart } from "@/redux/slices/cartProductSlise";
import { addProductToCompare } from "@/redux/slices/compareSlice";
import classNames from "classnames";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
};

export default function ProductItem({ product }: { product: Product }) {
  const { error, loading, globalError } = useAppSelector((state) => state.compare);
  const dispatch = useAppDispatch();
  const compareButtonClass = classNames(styles.detailsLink, {
    [styles.disabledButton]: error[product._id] === "Product already in compare",
    [styles.disabledButton2]: error[product._id] === "You can only compare up to 4 products",
  });

  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        productId: product._id,
        quantity: 1,
      }),
    );
  };

  const hendleAddToCompare = async () => {
    dispatch(addProductToCompare(product._id));
  };

  // if (error === "Product already in compare") {
  //   alert('цеаe');
  // }

  const imageSrc = product.images?.length
    ? `http://localhost:5000/images/${encodeURIComponent(product.images[0])}`
    : placeholderImg.src;

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imageSrc} alt={product.name} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
        </div>
      </div>

      <div className={styles.hoverActions}>
        <ButtonAddToCart text="Add to cart" onClick={handleAddToCart} />
        <div>
          <Link
            href={`/products/${product._id}`}
            className={styles.detailsLink}
          >
            Details
          </Link>
          <button onClick={hendleAddToCompare} className={compareButtonClass}>
            {error[product._id] ? error[product._id] : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}
