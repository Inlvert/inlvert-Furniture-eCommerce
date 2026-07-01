"use client";

import ArticleBox from "@/components/ArticleBox/ArticleBox";
import BrowseTheRange from "@/components/BrowseTheRange/BrowseTheRange";
import ButtonMore from "@/components/ButtonMore/ButtonMore";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import Navbar from "@/components/Navbar/Navbar";
import ProductListWithOutPaginate from "@/components/ProductListWithOutPaginate/ProductListWithOutPaginate";
import Slider from "@/components/Slider/Slider";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import * as API from "@/api";
import { useEffect, useState } from "react";
import { getProducts } from "@/redux/slices/productSlice";

export default function Home() {
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

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/products");
  };

  
  return (
    <div className="flex items-center flex-col">
      {!serverReady && <Loader text="Starting the Server..." />}
      <Navbar />
      <div className="relative flex flex-col justify-center">
        <img
          src="/images/scandinavian-interior-mockup-wall-decal-background 1home_bg.png"
          alt=""
          className="w-full max-w-[1440px] h-auto"
        />
        <ArticleBox />
      </div>
      <BrowseTheRange />
      <ProductListWithOutPaginate />
      <ButtonMore text="Show More" onClick={handleRedirect} />
      <Slider />
      <Gallery />
      <Footer />
    </div>
  );
}
