"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styles from "./Subscribe.module.scss";

const SubscribeSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function Subscribe() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={SubscribeSchema}
      onSubmit={(values, formikbag) => {
        console.log(values);
        formikbag.resetForm();
      }}
    >
      <Form className={styles.cover}>
        <Field
          name="email"
          type="email"
          placeholder="Enter Your Email Address"
          className={styles.inputText}
        />

        <ErrorMessage name="email" component="div" className={styles.error} />

        <button type="submit" className={styles.submitButton}>
          SUBSCRIBE
        </button>
      </Form>
    </Formik>
  );
}
