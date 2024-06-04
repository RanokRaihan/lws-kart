import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Stock from "../productDetails/Stock";

const WishListItem = ({ item }) => {
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
        <h2 className="text-gray-800 text-xl font-medium uppercase">{name}</h2>
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
      <Link
        href="#"
        className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
      >
        add to cart
      </Link>

      <div className="text-gray-600 cursor-pointer hover:text-primary">
        <FontAwesomeIcon icon={faTrash} className="size-6" />
      </div>
    </div>
  );
};

export default WishListItem;
