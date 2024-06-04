import { getUserWishList } from "@/actions";
import { getTrendingProducts } from "@/database/productQuery";
import ProductCard from "../ui/cards/ProductCard";

const TrendingProducts = async () => {
  const { data: trending } = await getTrendingProducts();
  const { wishlistItems } = await getUserWishList();
  const wishlist = wishlistItems?.map((item) => item?.id);
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        TRENDING PRODUCTS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trending &&
          trending?.length > 0 &&
          trending.map((product) => (
            <ProductCard
              key={product?._id?.toString()}
              product={product}
              wishlist={wishlist}
            />
          ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
