import Image from "next/image";
import Link from "next/link";
import RemoveButton from "./RemoveButton";

const CartItem = ({ item }) => {
  const { _id, name, price, discount, rating, ratedUser, images, description } =
    item?.product || {};

  return (
    <div className="flex items-center space-x-4">
      <Image
        className="w-20 h-20 object-cover rounded"
        src={images?.[0] || "https://via.placeholder.com/80"}
        alt="Product Image"
        width={80}
        height={80}
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">
          <Link href={`/product/${_id}`}>{name}</Link>
        </h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-gray-800">
            {" "}
            ${Math.round((price - (price * discount) / 100) * 100) / 100}
          </span>
          <span className="text-gray-600">x {item?.quantity}</span>
        </div>
      </div>
      <RemoveButton productId={_id} />
    </div>
  );
};

export default CartItem;
