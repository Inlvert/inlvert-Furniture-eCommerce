"use client";

import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";


function Shop() {

  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Shop" />
      <ProductList />
      <Footer />
    </div>
  );
}

export default Shop;