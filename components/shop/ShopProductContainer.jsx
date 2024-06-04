import { getUserWishList } from "@/actions";
import { auth } from "@/auth";
import { getProducts } from "@/database/productQuery";
import ProductCard from "../ui/cards/ProductCard";

const ShopProductContainer = async ({ searchParams }) => {
  const session = await auth();
  const res = await getProducts(searchParams);
  const { data } = res || {};
  const { wishlistItems } = await getUserWishList();
  const wishlist = wishlistItems?.map((item) => item?.id);

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {data && data?.length > 0 ? (
          data.map((product) => (
            <ProductCard
              key={product?._id?.toString()}
              product={product}
              wishlist={wishlist}
            />
          ))
        ) : (
          <div>
            <p className="text-6xl text-gray-400 text-center">
              No product matched
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProductContainer;
