import { auth } from "@/auth";
import { getUserInfo } from "@/database/userQuery";
import Link from "next/link";
import AddressCard from "./AddressCard";

const BillingAddress = async () => {
  const session = await auth();
  const { userInfo, error } =
    (await getUserInfo(session?.user?.id || session?.user?._id)) || {};
  const { firstName, lastName, street, city, postalCode, mobile } =
    userInfo?.defaultBillingAddress || {};
  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Billing address</h3>
        <Link href="/account/editaddress?type=billing" className="text-primary">
          {userInfo?.defaultBillingAddress ? "Edit" : "Add"}
        </Link>
      </div>
      {userInfo?.defaultBillingAddress ? (
        <AddressCard addressInfo={userInfo?.defaultBillingAddress} />
      ) : (
        <div className="space-y-1">
          <p className="text-gray-400">
            No default billing address available. please click the `add` button
            to add one.
          </p>
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
