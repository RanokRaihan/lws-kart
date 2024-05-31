import ProductDescription from "@/components/productDetails/ProductDescription";
import ProductDetailsContainer from "@/components/productDetails/ProductDetailsContainer";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { getSingleProduct } from "@/database/productQuery";

export default async function ProductDetailsPage({ params }) {
  const { id } = params || {};
  const res = await getSingleProduct(id);

  return (
    <>
      <BreadCrumb currentPage="Product Details" />
      <ProductDetailsContainer product={res?.data} />
      <ProductDescription description={res?.data?.description} />
      <RelatedProducts id={res?.data?._id} />
    </>
  );
}
