import { getNewArrivals } from "@/database/productQuery";
import ProductCard from "../ui/cards/ProductCard";

const NewArrival = async () => {
  const response = await getNewArrivals();
  const { data: newArrivalProducts } = response || {};
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivalProducts &&
          newArrivalProducts.length > 0 &&
          newArrivalProducts.map((product) => (
            <ProductCard key={product?._id?.toString()} product={product} />
          ))}
      </div>
    </div>
  );
};

export default NewArrival;
