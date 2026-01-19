"use client";
import Subscribe from "../Subscribe/Subscribe";
import styles from "./Footer.module.scss";

export default function Footer() {
  const address = "400 University Drive Suite 200\nCoral Gables, FL 33134\nUSA";

  return (
    <div className={styles.wrapper}>
      <div className={styles.position}>
        <div>
          <h1 className={styles.logoText}>Funiro.</h1>
          <p className={styles.pText}>{address}</p>
        </div>
        <div>
          <h2 className={styles.link}>Links</h2>
          <ul>
            <li className={styles.links}>Home</li>
            <li className={styles.links}>About Us</li>
            <li className={styles.links}>Features</li>
          </ul>
        </div>
        <div>
          <h2 className={styles.link}>Help</h2>
          <ul>
            <li className={styles.links}>Payment Options</li>
            <li className={styles.links}>Returns</li>
            <li className={styles.links}>Privacy Policies</li>
          </ul>
        </div>
        <div>
          <h2 className={styles.link}>Newsletter</h2>
          <Subscribe />
        </div>
      </div>

      <footer className={styles.rights}>
        &copy; {new Date().getFullYear()} furino. All rights reserved.
      </footer>
    </div>
  );
}
