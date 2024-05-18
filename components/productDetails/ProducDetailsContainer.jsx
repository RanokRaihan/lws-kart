import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

const ProducDetailsContainer = () => {
  return (
    <div className="container grid grid-cols-2 gap-6">
      <ProductImages />
      <ProductDetails />
    </div>
  );
};

export default ProducDetailsContainer;
