import ProducDetailsContainer from "@/components/productDetails/ProducDetailsContainer";
import ProductDescription from "@/components/productDetails/ProductDescription";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";

export default function ProductDetailsPage() {
  return (
    <>
      <BreadCrumb currentPage="Product Details" />
      <ProducDetailsContainer />
      <ProductDescription />
      <RelatedProducts />
    </>
  );
}
