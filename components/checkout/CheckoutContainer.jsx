import { auth } from "@/auth";
import { getUserInfo } from "@/database/userQuery";
import CheckoutFormElements from "./CheckoutFormElements";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutContainer = async () => {
  const session = await auth();
  const { userInfo } = await getUserInfo(
    session?.user?.id || session?.user?._id
  );

  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
      <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
        <CheckoutFormElements address={userInfo?.defaultShippingAddress} />
      </div>
      <CheckoutSummary />
    </div>
  );
};

export default CheckoutContainer;
