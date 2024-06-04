import { getCartItems } from "@/actions";
import { auth } from "@/auth";
import CartContainer from "@/components/cart/CartContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=cart");
  }
  const response = await getCartItems();
  const { items: cartItems } = JSON.parse(response);
  return (
    <>
      <BreadCrumb currentPage="Shopping Cart" />
      {cartItems && cartItems?.length > 0 ? (
        <CartContainer />
      ) : (
        <div className="min-h-[40vh] flex items-center justify-center">
          {" "}
          <h1 className="text-4xl text-center text-gray-400">
            There is no product in the cart
          </h1>{" "}
        </div>
      )}
    </>
  );
}
