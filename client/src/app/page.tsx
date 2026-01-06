import ArticleBox from "@/components/ArticleBox/ArticleBox";
import BrowseTheRange from "@/components/BrowseTheRange/BrowseTheRange";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductList/ProductList";
import Slider from "@/components/Slider/Slider";

export default function Home() {
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
      <Slider />
    </div>
  );
}
