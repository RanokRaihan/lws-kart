import ProductDescription from "@/components/productDetails/ProductDescription";
import ProductDetailsContainer from "@/components/productDetails/ProductDetailsContainer";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { getSingleProduct } from "@/database/productQuery";
import { notFound } from "next/navigation";
export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params?.id;

  // fetch data
  const res = await getSingleProduct(id);
  if (!res?.data) {
    return {
      title: "product not found",
      description: "the product you looking for is not available",
    };
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: res?.data?.name,
    description: res?.data?.description.slice(0, 160),
    openGraph: {
      images: [res?.data?.images?.[0], ...previousImages],
    },
  };
}
export default async function ProductDetailsPage({ params }) {
  const { id } = params || {};
  const res = await getSingleProduct(id);
  if (!res?.data) {
    notFound();
  }

  return (
    <>
      <BreadCrumb currentPage="Product Details" />
      <ProductDetailsContainer product={res?.data} />
      <ProductDescription description={res?.data?.description} />
      <RelatedProducts id={res?.data?._id} />
    </>
  );
}
