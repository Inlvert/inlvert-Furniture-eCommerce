"use client";

import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./Cancel.module.scss";


function Cancel() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Cancel" />
      <div className={styles.cover}>
        <h1 className={styles.success}>Cancel !!!</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Cancel;
