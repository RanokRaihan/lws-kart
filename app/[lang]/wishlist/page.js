import { auth } from "@/auth";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import WishList from "@/components/wishlist/WishList";
import { redirect } from "next/navigation";

export default async function WishListPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?redirect_to=wishlist");
  }

  return (
    <>
      <BreadCrumb currentPage="Wish List" />
      <WishList />
    </>
  );
}
