"use client";

import ArticleBox from "@/components/ArticleBox/ArticleBox";
import BrowseTheRange from "@/components/BrowseTheRange/BrowseTheRange";
import ButtonMore from "@/components/ButtonMore/ButtonMore";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";
import Slider from "@/components/Slider/Slider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/shop");
  };

  return (
    <div className="flex items-center  flex-col">
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
      <ProductList />
      <ButtonMore text="Show More" onClick={handleRedirect} />
      <Slider />
      <Gallery />
      <Footer />
    </div>
  );
}
