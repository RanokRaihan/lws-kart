import { getCartItems } from "@/actions";
import { auth } from "@/auth";
import CheckoutContainer from "@/components/checkout/CheckoutContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=checkout");
  }
  const response = await getCartItems();
  const { items: cartItems } = JSON.parse(response);
  return (
    <>
      <BreadCrumb currentPage="Checkout" />
      {cartItems && cartItems?.length > 0 ? (
        <CheckoutContainer />
      ) : (
        <div className="min-h-[40vh] flex flex-col gap-4 items-center justify-center">
          <p className="text-xl text-gray-500">
            no item in your cart to checkout. please add items to cart first.
          </p>
          <Link
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
            href="/shop"
          >
            Go to shop page
          </Link>
        </div>
      )}
    </>
  );
}
