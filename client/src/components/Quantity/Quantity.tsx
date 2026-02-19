'use client';

import { useState } from "react";
import styles from "./Quantity.module.scss";

type QuantityProps = {
  quantity: number;
  onChange: (newQuantity: number) => void;
};

export default function Quantity({ quantity, onChange }: QuantityProps) {
  useState()
  function handleDecrement() {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  }

  function handleIncrement() {
    onChange(quantity + 1);
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleDecrement}>
        -
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.button} onClick={handleIncrement}>
        +
      </button>
    </div>
  ); 
}