"use client";

import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";

function Shop() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Shop" />
      <ProductList page={1} limit={4} withPagination />
      <Feature />
      <Footer />
    </div>
  );
}

export default Shop;
