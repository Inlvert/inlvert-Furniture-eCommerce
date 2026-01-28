"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./SingupForm.module.scss";
import GoogleIcon from "../GoogleIcon/GoogleIcon";
import { login, registration } from "@/redux/slices/authSlice";
import { SignupDto } from "@/api";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";

interface SignupValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const initialValues: SignupValues = {
  email: "john_doe1@mail.com",
  password: "12345user",
  firstName: "John",
  lastName: "Doe",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

export default function SignupForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    userData: SignupDto,
    { resetForm, setStatus }: FormikHelpers<SignupDto>,
  ) => {
    try {
      await dispatch(registration(userData)).unwrap();
      console.log("Signup submitted:", userData);
      resetForm();
    } catch (error) {
      setStatus(error as string);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google/callback";
    // `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Signup</h2>

          {status && <p className={styles.error}>{status}</p>}

          {/* Email */}
          <div className={styles.field}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Password */}
          <div className={styles.field}>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          {/* First Name */}
          <div className={styles.field}>
            <Field
              name="firstName"
              type="text"
              placeholder="First Name"
              className={styles.input}
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Last Name */}
          <div className={styles.field}>
            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Login */}
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Signup"}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className={styles.google}
          >
            <GoogleIcon size={20} />
            Continue with Google
          </button>
        </Form>
      )}
    </Formik>
  );
}
