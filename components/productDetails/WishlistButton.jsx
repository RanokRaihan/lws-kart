"use client";
import { getUserWishList, toggleWishList } from "@/actions";
import { faHeart, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistButton = ({ session, productId, initialIsFavourite }) => {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
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
    if (result?.task === "add") {
      setIsFavourite(true);
    }
    if (result?.task === "remove") {
      setIsFavourite(false);
    }
  }, [result?.task]);

  //refetch the favourite
  useEffect(() => {
    (async () => {
      if (result?.success) {
        await getUserWishList();
      }
    })();
  }, [result]);

  const handleWishlistClick = async () => {
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
      const response = await toggleWishList(
        session?.user?.id || session?.user?._id,
        productId
      );
      setIsLoading(false);
      setResult(JSON.parse(response));
    }
  };
  return (
    <button
      onClick={handleWishlistClick}
      disabled={isLoading}
      className={`border ${
        isFavourite
          ? "border-red-500 text-red-500"
          : " border-gray-300 text-gray-600"
      } px-1 w-40 py-2 font-medium rounded uppercase flex items-center justify-center gap-2 hover:text-primary transition`}
    >
      {isLoading ? (
        <FontAwesomeIcon
          icon={faHourglassEnd}
          className="size-4 text-blue-500 animate-spin"
        />
      ) : (
        <>
          <FontAwesomeIcon icon={faHeart} className="size-5" />
          <span>wishlist</span>
        </>
      )}
    </button>
  );
};

export default WishlistButton;
