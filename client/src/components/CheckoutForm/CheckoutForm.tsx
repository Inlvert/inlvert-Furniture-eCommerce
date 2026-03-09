"use client";

import styles from "./CheckoutForm.module.scss";
import { Formik, Form, Field } from "formik";
import { useAppSelector } from "@/redux/hooks";

export default function CheckoutForm() {
  const { items } = useAppSelector((state) => state.cartProduct);

  const total = items.reduce(
    (sum, i) => sum + (i.productId?.price || 0) * (i.quantity || 0),
    0
  );

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          company: "",
          country: "",
          address: "",
          city: "",
          province: "",
          zip: "",
          phone: "",
          email: "",
          note: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
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
                <label>Company Name (Optional)</label>
                <Field name="company" />
              </div>

              <div className={styles.field}>
                <label>Country / Region</label>
                <Field as="select" name="country">
                  <option>USA</option>
                  <option>EUROPE</option>
                  <option>Ukraine</option>
                </Field>
              </div>

              <div className={styles.field}>
                <label>Street address</label>
                <Field name="address" />
              </div>

              <div className={styles.field}>
                <label>Town / City</label>
                <Field name="city" />
              </div>

              <div className={styles.field}>
                <label>Province</label>
                <Field as="select" name="province">
                  <option>Western Province</option>
                  <option>Central Province</option>
                </Field>
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
                <label>Email address</label>
                <Field name="email" type="email" />
              </div>

              <div className={styles.field}>
                <Field
                  name="note"
                  placeholder="Additional information"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className={styles.summary}>
              <h3>Product</h3>

              {items.map((item, index) => {
                const product = item.productId;
                if (!product) return null;

                return (
                  <div key={index} className={styles.productRow}>
                    <span>
                      {product.name} × {item.quantity}
                    </span>
                    <span>
                      ${(product.price * item.quantity).toFixed(2)}
                    </span>
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

              <div className={styles.payment}>
                <label>
                  <input type="radio" name="payment" defaultChecked />
                  Direct Bank Transfer
                </label>

                <p>
                  Make your payment directly into our bank account.
                  Please use your Order ID as the payment reference.
                </p>

                <label>
                  <input type="radio" name="payment" />
                  Cash On Delivery
                </label>
              </div>

              <button type="submit" className={styles.orderBtn}>
                Place order
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}