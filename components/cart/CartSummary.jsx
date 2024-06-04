import { calculateTotalCartPrice } from "@/lib/cartTotal";
import Link from "next/link";
const CartSummary = ({ items }) => {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">Total</span>
        <span className="text-xl font-semibold">
          ${calculateTotalCartPrice(items)}
        </span>
      </div>
      <Link
        href="/checkout"
        className="mt-4  bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
