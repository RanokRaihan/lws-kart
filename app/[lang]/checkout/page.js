import CheckoutContainer from "@/components/checkout/CheckoutContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";

export default function CheckoutPage() {
  return (
    <>
      <BreadCrumb currentPage="Checkout" />
      <CheckoutContainer />
    </>
  );
}
