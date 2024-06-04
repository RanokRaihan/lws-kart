import { auth } from "@/auth";
import { checkIsFavourite } from "@/lib/isFavourite";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../AddToCart";
import AddToFavouriteButton from "../AddToFavouriteButton";

const ProductCard = async ({ product, wishlist = [] }) => {
  // get session
  const session = await auth();
  // use product data to render ui
  const { id, name, price, discount, rating, ratedUser, images } =
    product || {};
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <div className="relative w-full h-60">
          <Image
            src={
              images?.[0]
                ? images?.[0]
                : "/assets/images/not-found/product-image-placeholder.png"
            }
            alt="product 1"
            className={images?.[0] ? "object-contain" : "object-cover"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/product/${id?.toString()}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="size-5" />
          </Link>
          <AddToFavouriteButton
            session={session}
            productId={id?.toString()}
            initialIsFavourite={checkIsFavourite(id?.toString(), wishlist)}
          />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/product/${id?.toString()}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-2 h-14">
            {name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${Math.round((price - (price * discount) / 100) * 100) / 100}
          </p>
          <p className="text-sm text-gray-400 line-through">${price}</p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <FontAwesomeIcon icon={faStar} className="size-4" />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} className="size-4" />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} className="size-4" />
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">({ratedUser})</div>
        </div>
      </div>
      <AddToCart session={session} productId={id?.toString()} />
    </div>
  );
};

export default ProductCard;
