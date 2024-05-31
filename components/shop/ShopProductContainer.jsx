import { getProducts } from "@/database/productQuery";
import ProductCard from "../ui/cards/ProductCard";

const ShopProductContainer = async ({ searchParams }) => {
  const res = await getProducts(searchParams);
  const { data } = res || {};

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {data &&
          data.map((product) => (
            <ProductCard key={product?._id?.toString()} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ShopProductContainer;
