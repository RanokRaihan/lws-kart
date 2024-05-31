import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

const ProductDetailsContainer = ({ product }) => {
  return (
    <div className="container grid grid-cols-2 gap-6">
      <ProductImages images={product?.images} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsContainer;
