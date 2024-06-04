import { getCartItems } from "@/actions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartContainer = async () => {
  const response = await getCartItems();
  const { items: cartItems } = JSON.parse(response);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <span className="text-gray-600">3 items</span>
          </div>

          <div className="space-y-4">
            {cartItems && cartItems?.length > 0 ? (
              cartItems?.map((item) => <CartItem key={item?.id} item={item} />)
            ) : (
              <h1>There is no product in cart</h1>
            )}
          </div>

          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
