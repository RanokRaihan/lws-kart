import { getRelatedProducts } from "@/database/productQuery";
import ProductCard from "../ui/cards/ProductCard";

const RelatedProducts = async ({ id }) => {
  const relatedProducts = await getRelatedProducts(id);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Related products
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {relatedProducts &&
          relatedProducts.map((product) => (
            <ProductCard key={product?._id?.toString()} product={product} />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
