"use client";

import BrowseTheRangeCards from "../BrowseTheRangeCards/BrowseTheRangeCards";
import styles from "./BrowseTheRange.module.scss";

const imgProps = [
  {
    src: "/images/BrowseTheRange1.png",
    title: "Dining",
  },
  {
    src: "/images/BrowseTheRange2.png",
    title: "Living",
  },
  {
    src: "/images/BrowseTheRange3.png",
    title: "Bedroom",
  },
];
export default function BrowseTheRange() {
  return (
    <div className={`${styles.cover} w-full max-w-[1440px] h-auto`}>
      <h1 className={`${styles.text1}`}>BrowseTheRange</h1>
      <h2 className={`${styles.text2}`}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </h2>
      <BrowseTheRangeCards imgProps={imgProps} />
    </div>
  );
}
