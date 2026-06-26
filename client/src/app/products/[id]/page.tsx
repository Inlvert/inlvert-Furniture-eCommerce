import Footer from "@/components/Footer/Footer";
import FrameV2 from "@/components/FrameV2/FrameV2";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetailsView from "@/components/ProductDetailsView/ProductDetailsView";
import ProductListWithOutPaginate from "@/components/ProductListWithOutPaginate/ProductListWithOutPaginate";

async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.log("API error:", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex items-center flex-col">
      <Navbar />
      <FrameV2 title={product.name} />
      <ProductDetailsView product={product} />
      <ProductListWithOutPaginate title="Related Products" />
      <Footer />
    </div>
  );
}
