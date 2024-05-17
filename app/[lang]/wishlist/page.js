import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import WishList from "@/components/wishlist/WishList";

export default function WishListPage() {
  return (
    <>
      <BreadCrumb currentPage="Wish List" />
      <WishList />
    </>
  );
}
