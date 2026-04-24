"use client";

import SendMail from "../SendMail/SendMail";
import styles from "./ContactInfo.module.scss";
import { Formik, Form, Field } from "formik";

export default function ContactInfo() {
  return (
    <div className={styles.cover}>
      <h1 className={styles.title}>Get In Touch With Us</h1>
      <p className={styles.description}>
        For More Information About Our Product & Services. Please Feel Free To
        Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
        Hesitate!
      </p>
      <div className={styles.box}>
        <div>
          <>
            <div className={styles.container}>
              <img
                src="location-pin-svgrepo-com.svg"
                alt="location"
                width="40"
                height="40"
              />
              <div className={styles.text}>
                <h1 className={styles.textH1}>Address</h1>
                <h2 className={styles.textP}>
                  236 5th SE Avenue, New York NY10000, United States
                </h2>
              </div>
            </div>
            <div className={styles.container}>
              <img
                src="phone-svgrepo-com.svg"
                alt="phone"
                width="40"
                height="40"
              />
              <div className={styles.text}>
                <h1 className={styles.textH1}>Phone</h1>
                <h2 className={styles.textP}>
                  Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
                </h2>
              </div>
            </div>
            <div className={styles.container}>
              <img
                src="time-filled-svgrepo-com.svg"
                alt="time"
                width="40"
                height="40"
              />
              <div className={styles.text}>
                <h1 className={styles.textH1}>Working Time</h1>
                <h2 className={styles.textP}>
                  Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
                </h2>
              </div>
            </div>
          </>
        </div>
        <div>
          <SendMail />
        </div>
      </div>
    </div>
  );
}
