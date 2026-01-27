"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.scss";
import GoogleIcon from "../GoogleIcon/GoogleIcon";
import { login } from "@/redux/slices/authSlice";
import { LoginDto } from "@/api";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "user@mail.com",
  password: "12345user",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (
    userData: LoginDto,
    { resetForm }: FormikHelpers<LoginDto>,
  ) => {
    dispatch(login(userData));
    console.log("Form submitted:", userData);
    resetForm();
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
          <h2 className={styles.title}>Login</h2>

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

          {/* Login */}
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

          <Link href="/signup" className={styles.submit}>
            {"Signup"}
          </Link>

          {/* Divider */}
          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* 🌍 Google OAuth */}
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
