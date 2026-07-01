"use client";

import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";
import SortSettings from "@/components/SortSettings/SortSettings";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getProducts } from "@/redux/slices/productSlice";
import * as API from "@/api";
import Loader from "@/components/Loader/Loader";

function Shop() {
  const [serverReady, setServerReady] = useState(false);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (serverReady) return;
  
      const checkServerHealth = async () => {
        try {
          const data = await API.checkHealthServer();
  
          console.log("Server health check:", data);
  
          if (data.status === "ok") {
            console.log("Server is ready", data);
            setServerReady(true);
            clearInterval(interval);
          }
        } catch (error) {
          console.log("Error checking server health:", error);
        }
      };
  
      checkServerHealth();
  
      const interval = setInterval(checkServerHealth, 3000);
  
      return () => clearInterval(interval);
    }, [serverReady]);
  
    useEffect(() => {
      if (serverReady) {
        dispatch(getProducts({ page: 1, limit: 8 }));
      }
    }, [dispatch, serverReady]);
    
  return (
    <div className="flex items-center  flex-col">
      {!serverReady && <Loader text="Starting the Server..." />}
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
