"use client";

import style from "./AboutInfo.module.scss";

export default function AboutInfo() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>About Us</h1>

      <p className={style.greeting}>
        Welcome to our furniture e-commerce store! We are passionate about
        providing high-quality, stylish, and affordable furniture to our
        customers. Our mission is to help you create a beautiful and comfortable
        living space that reflects your unique style and personality.
      </p>
      <div className={style.content}>
        <div className={style.left}>
          <p className={style.description}>
            We believe that furniture is not just functional but also an
            expression of art and creativity. That's why we carefully curate our
            collection to include a wide range of designs, from classic to
            contemporary, to suit every taste and preference. Whether you're
            looking for a cozy sofa, a sleek dining table, or a statement piece
            for your living room, we have something for everyone.
          </p>
          <p className={style.description}>
            Our team is dedicated to providing exceptional customer service and
            ensuring that your shopping experience with us is seamless and
            enjoyable. We are committed to delivering high-quality products that
            meet your expectations and exceed them whenever possible. Thank you
            for choosing us as your go-to destination for all your furniture
            needs!
          </p>
        </div>
        <div className={style.right}>
          <img src="/images/about-furniro-1.jpg" alt="About Us" />
        </div>
      </div>
    </div>
  );
}
