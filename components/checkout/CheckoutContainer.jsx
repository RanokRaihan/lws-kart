import CheckoutFormElements from "./CheckoutFormElements";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutContainer = () => {
  return (
    <form className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
      <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
        <CheckoutFormElements />
      </div>
      <CheckoutSummary />
    </form>
  );
};

export default CheckoutContainer;
