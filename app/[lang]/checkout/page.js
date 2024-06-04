import { auth } from "@/auth";
import CheckoutContainer from "@/components/checkout/CheckoutContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=checkout");
  }
  return (
    <>
      <BreadCrumb currentPage="Checkout" />
      <CheckoutContainer />
    </>
  );
}
