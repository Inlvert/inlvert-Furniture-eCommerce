"use client";

import { useState } from "react";
import styles from "./CheckoutForm.module.scss";
import { Formik, Form, Field } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/redux/slices/orderSlice";

export default function CheckoutForm() {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cartProduct);
  const user = useAppSelector((state) => state.auth?.user);
  

  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
    "stripe",
  );
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, i) => sum + (i.productId?.price || 0) * (i.quantity || 0),
    0,
  );

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    country: "USA",
    address: "test",
    city: "test",
    province: "test",
    zip: "11111",
    phone: "1111111111",
    email: user?.email || "",
    note: "test",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!items.length) return;

    setLoading(true);

    try {
      const orderData = {
        paymentMethod,

        items: items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          // price: item.productId.price,
          color: item.color,
          size: item.size,
        })),

        billingDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          country: values.country,
          address: values.address,
          city: values.city,
          province: values.province,
          zip: values.zip,
          phone: values.phone,
          email: values.email,
          note: values.note,
        },

        // totalPrice: total,
      };

      const res = await dispatch(createOrder(orderData)).unwrap();

      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (error: any) {
      console.error("Checkout error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (
    method: "stripe" | "paypal",
    submitForm: () => void,
  ) => {
    setPaymentMethod(method);
    submitForm();
  };

  return (
    <div className={styles.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ submitForm }) => (
          <Form className={styles.container}>
            {/* LEFT SIDE */}
            <div className={styles.billing}>
              <h2>Billing details</h2>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>First Name</label>
                  <Field name="firstName" />
                </div>

                <div className={styles.field}>
                  <label>Last Name</label>
                  <Field name="lastName" />
                </div>
              </div>

              <div className={styles.field}>
                <label>Country</label>
                <Field as="select" name="country">
                  <option>USA</option>
                  <option>EU</option>
                  <option>Ukraine</option>
                </Field>
              </div>

              <div className={styles.field}>
                <label>Address</label>
                <Field name="address" />
              </div>

              <div className={styles.field}>
                <label>City</label>
                <Field name="city" />
              </div>

              <div className={styles.field}>
                <label>Province</label>
                <Field name="province" />
              </div>

              <div className={styles.field}>
                <label>ZIP code</label>
                <Field name="zip" />
              </div>

              <div className={styles.field}>
                <label>Phone</label>
                <Field name="phone" />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <Field name="email" type="email" />
              </div>

              <div className={styles.field}>
                <Field name="note" placeholder="Additional information" />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className={styles.summary}>
              <h3>Your order</h3>

              {items.map((item, index) => {
                const product = item.productId;
                if (!product) return null;

                return (
                  <div key={index} className={styles.productRow}>
                    <span>
                      {product.name} × {item.quantity}
                    </span>

                    <span>${(product.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}

              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className={styles.paymentButtons}>
                <button
                  type="button"
                  className={styles.orderBtn}
                  disabled={loading}
                  onClick={() => handlePayment("stripe", submitForm)}
                >
                  {loading ? "Processing..." : "Pay with Card"}
                </button>

                <button
                  type="button"
                  className={styles.orderBtn}
                  disabled={loading}
                  onClick={() => handlePayment("paypal", submitForm)}
                >
                  {loading ? "Processing..." : "Pay with PayPal"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
