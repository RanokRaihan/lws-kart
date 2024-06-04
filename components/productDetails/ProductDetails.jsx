import { getUserWishList } from "@/actions";
import { auth } from "@/auth";
import { checkIsFavourite } from "@/lib/isFavourite";
import StarRating from "../ui/StarRating";
import CartButton from "./CartButton";
import SocialMediaShare from "./SocialMediaShare";
import Stock from "./Stock";
import WishlistButton from "./WishlistButton";

const ProductDetails = async ({ product }) => {
  const {
    _id,
    name,
    description,
    stock,
    brand,
    category,
    price,
    discount,
    rating,
    ratedUser,
  } = product || {};
  const session = await auth();
  const { wishlistItems } = await getUserWishList();
  const wishlist = wishlistItems?.map((item) => item?.id);
  return (
    <div>
      <h2 className="text-3xl font-medium uppercase mb-2">{name}</h2>
      <div className="flex items-center mb-4">
        <StarRating rating={rating} />
        <div className="text-xs text-gray-500 ml-3">({ratedUser} Reviews)</div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-800 font-semibold space-x-2">
          <span>Availability: </span>
          <Stock stock={stock} />
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">Brand: </span>
          <span className="text-gray-600">{brand}</span>
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">Category: </span>
          <span className="text-gray-600">{category?.name}</span>
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">SKU: </span>
          <span className="text-gray-600">BE45VGRT</span>
        </p>
      </div>
      <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
        <p className="text-xl text-primary font-semibold">
          {" "}
          ${Math.round((price - (price * discount) / 100) * 100) / 100}
        </p>
        <p className="text-base text-gray-400 line-through">{price}</p>
      </div>

      <p className="mt-4 text-gray-600">{description}</p>

      <div className="mt-4">
        <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        {/* <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
          <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
            -
          </div>
          <div className="h-8 w-8 text-base flex items-center justify-center">
            4
          </div>
          <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
            +
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <CartButton session={session} productId={_id.toString()} />
        <WishlistButton
          session={session}
          productId={_id?.toString()}
          initialIsFavourite={checkIsFavourite(_id?.toString(), wishlist)}
        />
      </div>

      <SocialMediaShare />
    </div>
  );
};

export default ProductDetails;
