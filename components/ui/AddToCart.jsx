"use client";
import { addProductToCart, getCartItems } from "@/actions";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const AddToCart = ({ session, productId }) => {
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
      className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
    >
      {isLoading ? (
        <FontAwesomeIcon
          icon={faHourglassEnd}
          className="size-5 text-blue-500 animate-spin"
        />
      ) : (
        <span> Add to cart</span>
      )}
    </button>
  );
};

export default AddToCart;
