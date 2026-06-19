"use client";

import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";
import SortSettings from "@/components/SortSettings/SortSettings";

function Shop() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Shop" />
      <SortSettings />
      <ProductList limit={16} withPagination sort="default" />
      <Feature />
      <Footer />
    </div>
  );
}

export default Shop;
