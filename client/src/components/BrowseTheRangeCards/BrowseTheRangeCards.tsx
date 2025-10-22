"use client";

import styles from "./BrowseTheRangeCards.module.scss";

type ImgProps = {
  src: string;
  title: string;
};

type Props = {
  imgProps: ImgProps[];
};

export default function BrowseTheRangeCards({ imgProps }: Props) {
  const card = imgProps.map((item, index) => (
    <div key={index} className={styles.card}>
      <img src={item.src} alt={item.title} />
      <h3>{item.title}</h3>
    </div>
  ));
  

  return (
    <div className={`${styles.cover}`}>
      {card}
    </div>
  );
}
