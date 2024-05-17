import CartContainer from "@/components/cart/CartContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";

export default function CartPage() {
  return (
    <>
      <BreadCrumb currentPage="Shopping Cart" />
      <CartContainer />
    </>
  );
}
