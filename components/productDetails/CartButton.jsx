"use client";
import { addProductToCart, getCartItems } from "@/actions";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const CartButton = ({ session, productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (result?.success) {
      toast.success(result?.message);
    }

    if (result && !result.success) {
      toast.error(result.error);
    }
  }, [result]);

  useEffect(() => {
    (async () => {
      if (result?.success) {
        await getCartItems();
      }
    })();
  }, [result]);
  const handleAddToCart = async () => {
    //check if user logged in
    if (!session?.user) {
      localStorage.setItem(
        "intendedAction",
        JSON.stringify({ type: "ADD_TO_WISHLIST", productId })
      );
      toast.error("you must login first");
      router.push("/login");
    } else {
      setIsLoading(true);
      const response = await addProductToCart(productId);
      setIsLoading(false);
      setResult(JSON.parse(response));
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="px-1 w-40  bg-primary text-white py-2 font-medium rounded uppercase flex items-center justify-center gap-2 hover:bg-red-600 transition"
    >
      {isLoading ? (
        <FontAwesomeIcon
          icon={faHourglassEnd}
          className="size-5 text-white animate-spin"
        />
      ) : (
        <span className="block"> Add to cart</span>
      )}
    </button>
  );
};

export default CartButton;
