"use client";

import Image from "next/image";
import styles from "./Gallery.module.scss";
import images from "./galleryImages";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  function openImage(src: string) {
    setActiveImage(src);
  }

  function closeImage() {
    setActiveImage(null);
  }

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);
  
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeImage();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section className={`${styles.wrapper} w-full max-w-[1440px] h-auto`}>
        <p className={styles.subtitle}>Share your setup with</p>
        <h2 className={styles.title}>#FuniroFurniture</h2>

        <div className={styles.gridContainer}>
          {images.map((img) => (
            <div
              key={img.id}
              className={styles.item}
              onClick={() => openImage(img.src)}
            >
              <Image
                src={img.src}
                alt="Inspiration"
                fill
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </section>
   
      {activeImage && (
        <div className={styles.overlay} onClick={closeImage}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt="Preview"
              fill
              className={styles.previewImage}
              priority
            />

            <button className={styles.closeBtn} onClick={closeImage}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
