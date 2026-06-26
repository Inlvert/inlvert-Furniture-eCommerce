
import ButtonMore from "@/components/ButtonMore/ButtonMore";
import Footer from "@/components/Footer/Footer";
import FrameV2 from "@/components/FrameV2/FrameV2";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetailsView from "@/components/ProductDetailsView/ProductDetailsView";
import ProductListWithOutPaginate from "@/components/ProductListWithOutPaginate/ProductListWithOutPaginate";
import router from "next/dist/shared/lib/router/router";

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  // console.log(product);
  

  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <FrameV2 title={product.name} />
      <ProductDetailsView product={product} />
      <ProductListWithOutPaginate title="Related Products" />
      <Footer />
    </div>
  );
}
