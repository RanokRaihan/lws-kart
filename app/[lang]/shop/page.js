import ShopFilter from "@/components/shop/ShopFilter";
import ShopProductContainer from "@/components/shop/ShopProductContainer";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";

export default function ShopPage() {
  return (
    <>
      <BreadCrumb currentPage="Shop" />
      <div class="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <ShopFilter />
        <ShopProductContainer />
      </div>
    </>
  );
}
