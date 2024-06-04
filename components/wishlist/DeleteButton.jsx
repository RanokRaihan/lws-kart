"use client";

import { toggleWishList } from "@/actions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const DeleteButton = ({ userId, productId }) => {
  const handleDelete = async () => {
    const response = await toggleWishList(userId, productId);
    const result = JSON.parse(response);
    if (result?.success) {
      toast.success(result?.message);
    }
    if (result && !result?.success) {
      toast.error(result?.error);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="text-gray-600 cursor-pointer hover:text-primary"
    >
      <FontAwesomeIcon icon={faTrash} className="size-6" />
    </button>
  );
};

export default DeleteButton;
