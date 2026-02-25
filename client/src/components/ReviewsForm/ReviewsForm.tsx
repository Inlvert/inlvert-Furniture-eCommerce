'use client';

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
  rating: 1,
  comment: "test comment",
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

  const productId = params.id as string; // ← ВАЖЛИВО

  const handleSubmit = async (
    reviewData: ReviewValues,
    { resetForm, setStatus }: FormikHelpers<ReviewValues>,
  ) => {
    try {
      await dispatch(
        createReview({
          ...reviewData,
          productId, // ← додаємо сюди
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
        <Form className={styles.form}>
          <div>
            <label>Rating</label>
            <Field type="number" name="rating" min="1" max="5" />
            <ErrorMessage name="rating" component="div" />
          </div>

          <div>
            <label>Comment</label>
            <Field as="textarea" name="comment" />
            <ErrorMessage name="comment" component="div" />
          </div>

          <button type="submit">Submit Review</button>
        </Form>
      </Formik>
    </div>
  );
}