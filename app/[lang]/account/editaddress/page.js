import { auth } from "@/auth";
import EditAddressForm from "@/components/account/EditAddressForm";
import { getUserInfo } from "@/database/userQuery";
import { redirect } from "next/navigation";

export default async function EditAddressPage({ searchParams }) {
  const { type } = searchParams;
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=account");
  }
  const { userInfo, error } = (await getUserInfo(session?.user?.id)) || {};
  const { defaultShippingAddress, defaultBillingAddress } = userInfo || {};
  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6">
          Update {type === "billing" ? "Billing" : "Shipping"} Address
        </h2>
        <EditAddressForm
          type={type === "billing" ? "billing" : "shipping"}
          address={
            type === "billing" ? defaultBillingAddress : defaultShippingAddress
          }
          userId={session?.user?.id || session?.user?._id}
        />
      </div>
    </main>
  );
}
