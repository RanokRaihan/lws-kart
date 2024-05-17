import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartContainer = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <span className="text-gray-600">3 items</span>
          </div>

          <div className="space-y-4">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>

          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
