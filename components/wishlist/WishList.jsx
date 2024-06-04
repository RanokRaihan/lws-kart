import { getUserWishList } from "@/actions";
import WishListItem from "./WishListItem";

const WishList = async () => {
  const { wishlistItems } = await getUserWishList();

  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        {wishlistItems && wishlistItems?.length > 0 ? (
          wishlistItems.map((item) => (
            <WishListItem key={item?.id} item={item} />
          ))
        ) : (
          <div className="container min-h-[400px] mx-auto flex items-center justify-center">
            <h1 className="text-4xl text-center text-gray-400">
              It looks like there is no item in your wishlist!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
