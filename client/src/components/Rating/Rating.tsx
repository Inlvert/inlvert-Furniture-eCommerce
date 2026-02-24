"use client";

import { useState } from "react";
import styles from "./Rating.module.scss";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function Rating({
  value = 0,
  onChange,
  readOnly = false,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  const handleClick = (
    star: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (readOnly) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isHalf = clickX < width / 2;

    const newValue = isHalf ? star - 0.5 : star;
    onChange?.(newValue);
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(
          Math.max(displayValue - (star - 1), 0),
          1
        );

        return (
          <div
            key={star}
            onMouseMove={(e) => {
              if (readOnly) return;

              const { left, width } =
                e.currentTarget.getBoundingClientRect();
              const hoverX = e.clientX - left;
              const isHalf = hoverX < width / 2;
              setHoverValue(isHalf ? star - 0.5 : star);
            }}
            onMouseLeave={() => setHoverValue(null)}
            onClick={(e) => handleClick(star, e)}
            className={`${styles.star} ${
              readOnly ? styles.readOnly : ""
            }`}
          >
            <span className={styles.empty}>★</span>
            <span
              className={styles.filled}
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </div>
        );
      })}
    </div>
  );
}