"use client";

import { useState } from "react";
import styles from "./ProductDetailsView.module.scss";
import placeholderImg from "@/assets/placeholder.png";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/slices/cartProductSlise";
import VariantSelector from "../VariantSelector/VariantSelector";
import Quantity from "../Quantity/Quantity";
import ButtonAddToCartV2 from "../ButtonAddToCartV2/ButtonAddToCartV2";
import ProductTabs from "../ProductTabs/ProductTabs";
import Rating from "../Rating/Rating";
import ReviewsForm from "../ReviewsForm/ReviewsForm";

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
  averageRating?: number;
};

export default function ProductDetailsView({ product }: { product: Product }) {
  const images = product.images?.length
    ? product.images.map(
        (img) => `http://localhost:5000/images/${encodeURIComponent(img)}`,
      )
    : [placeholderImg.src];

  const [variant, setVariant] = useState({ size: "", color: "" });

  const [activeImage, setActiveImage] = useState(images[0]);

  const [qty, setQty] = useState(1);

  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(
      addProductToCart({
        productId: product._id,
        quantity: qty,
        size: variant.size,
        color: variant.color,
      }),
    );
    console.log("Added to cart:", {
      productId: product._id,
      quantity: qty,
      size: variant.size,
      color: variant.color,
    });
  }

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

          <Rating value={product.averageRating || 0} readOnly />

          <div className={styles.price}>${product.price}</div>

          <p className={styles.description}>{product.smallDescription}</p>

          <VariantSelector
            sizes={product.sizes}
            colors={product.colors}
            onChange={setVariant}
          />

          <div className={styles.variantsCover}>
            <Quantity quantity={qty} onChange={setQty} />

            <ButtonAddToCartV2 text="Add to cart" onClick={handleAddToCart} />

            <ButtonAddToCartV2 text="+ Compare" onClick={() => {}} />
          </div>
          <span className={styles.bordetop}></span>

          <h2 className={styles.textColor}>SKU: {product.sku}</h2>
          <h3 className={styles.textColor}>Category: {product.category}</h3>
          <h4 className={styles.textColor}>Tags: {product.tags}</h4>
          <h5 className={styles.textColor}>Share: </h5>
        </div>
      </div>
      <div className={styles.border}></div>
      <ProductTabs
        tabs={[
          {
            id: "description",
            label: "Description",
            content: <p>{product.description}</p>,
          },
          {
            id: "additional",
            label: "Additional Information",
            content: <p>Some additional info here</p>,
          },
          {
            id: "reviews",
            label: "Reviews",
            content: <ReviewsForm />,
          },
        ]}
      />
      <div className={styles.imageContainer}>
        <img
          src="/images/Cloud sofa three seater + ottoman_2_1.png"
          alt=""
          className={styles.imageBG}
        />
        <img
          src="/images/Cloud sofa three seater + ottoman_1_1.png"
          alt=""
          className={styles.imageBG}
        />
      </div>
      <div className={styles.border}></div>
    </div>
  );
}
