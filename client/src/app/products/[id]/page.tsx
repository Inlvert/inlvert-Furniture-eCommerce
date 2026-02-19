
import ButtonMore from "@/components/ButtonMore/ButtonMore";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetailsView from "@/components/ProductDetailsView/ProductDetailsView";
import ProductListWithOutPaginate from "@/components/ProductListWithOutPaginate/ProductListWithOutPaginate";
import router from "next/dist/shared/lib/router/router";

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProduct(id);
  

  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <ProductDetailsView product={product} />
      <ProductListWithOutPaginate title="Related Products" />
      <Footer />
    </div>
  );
}
