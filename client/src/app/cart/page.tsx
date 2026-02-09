"use client";

import CartList from "@/components/CartList/CartList";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";

function Cart() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Cart" />
      <CartList />
      <Footer />
    </div>
  );
}

export default Cart;
