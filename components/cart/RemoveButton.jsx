"use client";

import { removeProductFromCart } from "@/actions";
import toast from "react-hot-toast";

const RemoveButton = ({ productId }) => {
  const handleRemove = async () => {
    const response = await removeProductFromCart(productId);
    const result = JSON.parse(response);
    if (result?.success) {
      toast.success(result.message);
    }
    if (result && !result?.success) {
      toast.error(result?.error);
    }
  };
  return (
    <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
      Remove
    </button>
  );
};

export default RemoveButton;
