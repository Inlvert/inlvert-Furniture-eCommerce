"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.scss";
import images from "./images";

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.left}>
        <h2>50+ Beautiful rooms inspiration</h2>
        <p>
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </p>
        <button>Explore More</button>
      </div>
      
      <div className={styles.mainImage}>
        <Image
          src={images[current].url}
          alt={images[current].title}
          fill
          className={styles.image}
          priority
        />

        <div className={styles.caption}>
          <span>01 — {images[current].room}</span>
          <h3>{images[current].title}</h3>
        </div>
      </div>
    
      <div className={styles.right}>
        <div className={styles.preview}>
          <Image
            src={images[(current + 1) % images.length].url}
            alt="Preview"
            fill
            className={styles.image}
          />
          <button className={styles.arrow} onClick={next}>
            →
          </button>
        </div>

        <div className={styles.dots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={i === current ? styles.active : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
