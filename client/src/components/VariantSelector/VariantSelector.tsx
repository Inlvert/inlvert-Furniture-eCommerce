"use client";

import { useEffect, useState } from "react";
import styles from "./VariantSelector.module.scss";

type Props = {
  sizes?: string[];
  colors?: string[];
  onChange: (v: { size: string; color: string }) => void;
};

const defaultSizes = ["S", "M", "L"];
const defaultColors = ["#6c5ce7", "#000000", "#c49a2c"];

export default function VariantSelector({ sizes, colors, onChange }: Props) {
  const sizeList = sizes?.length ? sizes : defaultSizes;
  const colorList = colors?.length ? colors : defaultColors;

  const [selectedSize, setSelectedSize] = useState(sizeList[0]);
  const [selectedColor, setSelectedColor] = useState(colorList[0]);

  useEffect(() => {
    setSelectedSize(sizeList[0]);
    setSelectedColor(colorList[0]);
  }, [sizes, colors]);

  useEffect(() => {
    onChange({ size: selectedSize, color: selectedColor });
  }, [selectedSize, selectedColor]);

  return (
    <>
      {/* SIZE */}
      <div className={styles.block}>
        <div className={styles.label}>Size</div>

        <div className={styles.sizeRow}>
          {sizeList.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`${styles.sizeChip} ${
                selectedSize === size ? styles.sizeActive : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div className={styles.colorRow}>
        {colorList.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`${styles.colorDot} ${
              selectedColor === color ? styles.colorActive : ""
            }`}
            style={{ background: color }}
          />
        ))}
      </div>
    </>
  );
}
