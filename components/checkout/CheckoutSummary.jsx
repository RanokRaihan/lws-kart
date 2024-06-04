import { getCartItems } from "@/actions";
import { calculateTotalCartPrice } from "@/lib/cartTotal";
import CheckoutItem from "./CheckoutItem";

const CheckoutSummary = async () => {
  const response = await getCartItems();
  const { items: cartItems } = JSON.parse(response);
  return (
    <div className="col-span-4 border border-gray-200 p-4 rounded">
      <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
        order summary
      </h4>
      <div className="space-y-2">
        {cartItems && cartItems?.length > 0 ? (
          cartItems?.map((item) => <CheckoutItem key={item?.id} item={item} />)
        ) : (
          <p>No item in cart</p>
        )}
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>subtotal</p>
        <p>{calculateTotalCartPrice(cartItems)}</p>
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>shipping</p>
        <p>Free</p>
      </div>
      <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p className="font-semibold">Total</p>
        <p>${calculateTotalCartPrice(cartItems)}</p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
