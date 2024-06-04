import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../productDetails/CartButton";
import Stock from "../productDetails/Stock";
import DeleteButton from "./DeleteButton";

const WishListItem = async ({ item }) => {
  const session = await auth();
  const { id, name, price, discount, rating, ratedUser, images, stock } =
    item || {};
  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div className="w-28">
        <Image
          src={images?.[0]}
          alt={name}
          className="w-full"
          width={112}
          height={83}
        />
      </div>
      <div className="w-1/3">
        <h2 className="text-gray-800 text-xl font-medium uppercase">
          <Link href={`/product/${id}`}> {name}</Link>
        </h2>
        <p className="text-gray-500 text-sm">
          Availability: <Stock stock={stock} />
        </p>
      </div>
      <div className="flex items-baseline mb-1 space-x-2">
        <p className="text-xl text-primary font-semibold">
          ${Math.round((price - (price * discount) / 100) * 100) / 100}
        </p>
        <p className="text-sm text-gray-400 line-through">${price}</p>
      </div>
      <CartButton session={session} productId={id} />

      <DeleteButton
        userId={session?.user?.id || session?.user?._id}
        productId={id}
      />
    </div>
  );
};

export default WishListItem;
