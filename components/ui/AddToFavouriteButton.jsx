"use client";
import { getUserWishList, toggleWishList } from "@/actions";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddToFavouriteButton = ({ session, productId, initialIsFavourite }) => {
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
      className={` text-lg w-9 h-8 rounded-full ${
        isFavourite ? "bg-white" : "bg-primary"
      }  flex items-center justify-center hover:bg-gray-800 transition`}
      title="add to wishlist"
    >
      {isLoading ? (
        <FontAwesomeIcon
          icon={faHourglassEnd}
          className="size-5 text-yellow-500 animate-spin"
        />
      ) : isFavourite ? (
        <FontAwesomeIcon icon={faHeartSolid} className="size-5 text-red-500" />
      ) : (
        <FontAwesomeIcon icon={faHeart} className="size-5 text-white" />
      )}
    </button>
  );
};

export default AddToFavouriteButton;
