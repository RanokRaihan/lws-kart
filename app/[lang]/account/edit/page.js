import { auth } from "@/auth";
import EditAccountForm from "@/components/account/EditAccountForm";
import { getUserInfo } from "@/database/userQuery";
import { transformedObject } from "@/lib/mongoTransform";
import { redirect } from "next/navigation";

export default async function EditAccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=account");
  }
  const { userInfo, error } =
    (await getUserInfo(session?.user?.id || session?.user?._id)) || {};
  const { defaultShippingAddress, defaultBillingAddress, ...rest } = userInfo;
  return (
    <main className="bg-gray-100 flex items-center justify-center py-40">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Edit Account</h2>
        <EditAccountForm userInfo={transformedObject(rest)} />
      </div>
    </main>
  );
}
