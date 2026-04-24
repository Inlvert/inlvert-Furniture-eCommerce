"use client";

import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";

export default function CheckoutPage() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Checkout" />
      <CheckoutForm />
      <Feature />
      <Footer />
    </div>
  );
}
