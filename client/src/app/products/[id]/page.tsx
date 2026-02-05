import Navbar from "@/components/Navbar/Navbar";
import ProductDetailsView from "@/components/ProductDetailsView/ProductDetailsView";

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
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <Navbar />
      <ProductDetailsView product={product} />;
    </div>
  );
}
