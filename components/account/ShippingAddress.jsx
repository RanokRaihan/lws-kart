import { auth } from "@/auth";
import { getUserInfo } from "@/database/userQuery";
import Link from "next/link";
import AddressCard from "./AddressCard";

const ShippingAddress = async () => {
  const session = await auth();
  const { userInfo, error } =
    (await getUserInfo(session?.user?.id || session?.user?._id)) || {};

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
        <Link
          href="/account/editaddress?type=shipping"
          className="text-primary"
        >
          {userInfo?.defaultShippingAddress ? "Edit" : "Add"}
        </Link>
      </div>
      {userInfo?.defaultShippingAddress ? (
        <AddressCard addressInfo={userInfo?.defaultShippingAddress} />
      ) : (
        <div className="space-y-1">
          <p className="text-gray-400">
            No default shipping address available. please click the `add` button
            to add one.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
