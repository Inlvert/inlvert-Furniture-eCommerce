"use client";

import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./Success.module.scss";

function Success() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Success" />
      <div className={styles.cover}>
        <h1 className={styles.success}>Success!</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
