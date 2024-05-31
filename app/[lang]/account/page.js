import { auth } from "@/auth";
import BillingAddress from "@/components/account/BillingAddress";
import PersonalProfile from "@/components/account/PersonalProfile";
import ShippingAddress from "@/components/account/ShippingAddress";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?redirect_to=account");
  }
  return (
    <>
      <BreadCrumb currentPage="Account" />
      <div className="container  items-start gap-6 pt-4 pb-16 ">
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <PersonalProfile />
          <ShippingAddress />
          <BillingAddress />
        </div>
      </div>
    </>
  );
}
