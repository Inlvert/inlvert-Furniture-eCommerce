"use client";

import styles from "./SendMail.module.scss";
import { Formik, Form, Field } from "formik";
import Button from "../Button/Button";
import * as API from "@/api";

export default function SendMail() {

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await API.sendMessage(values);

      resetForm();
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to send message",
      );
    }
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.container}>
            <div className={styles.field}>
              <label className={styles.title}>Your Name</label>
              <Field type="text" name="name" placeholder="Your Name" />
            </div>
            <div className={styles.field}>
              <label className={styles.title}>Email</label>
              <Field type="email" name="email" placeholder="Your Email" />
            </div>
            <div className={styles.field}>
              <label className={styles.title}>Subject</label>
              <Field type="text" name="subject" placeholder="Subject" />
            </div>
            <div className={styles.field}>
              <label className={styles.title}>Your Message</label>
              <Field
                as="textarea"
                type="text"
                name="message"
                placeholder="Your Message"
              />
            </div>
            <Button text={isSubmitting ? "Sending..." : "Send"} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
