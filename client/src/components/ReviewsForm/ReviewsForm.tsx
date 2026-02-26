"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useParams } from "next/navigation";
import styles from "./ReviewsForm.module.scss";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createReview } from "@/redux/slices/reviewSlice";

interface ReviewValues {
  rating: number;
  comment: string;
}

const initialValues: ReviewValues = {
  rating: 0,
  comment: "",
};

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5")
    .required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
});

export default function ReviewsForm() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = params.id as string;

  const [hovered, setHovered] = useState<number | null>(null);

  const handleSubmit = async (
    reviewData: ReviewValues,
    { resetForm, setStatus }: FormikHelpers<ReviewValues>
  ) => {
    try {
      await dispatch(
        createReview({
          ...reviewData,
          productId,
        })
      ).unwrap();

      resetForm();
    } catch (error) {
      setStatus(error as string);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Leave a Review</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <div className={styles.ratingBlock}>
              <label>Rating</label>

              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (hovered ?? values.rating)
                        ? styles.activeStar
                        : styles.star
                    }
                    onClick={() => setFieldValue("rating", star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <ErrorMessage
                name="rating"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.commentBlock}>
              <label>Comment</label>
              <Field
                as="textarea"
                name="comment"
                className={styles.textarea}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.button}>
              Submit Review
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}