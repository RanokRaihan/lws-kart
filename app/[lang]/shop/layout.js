import Sidebar from "@/components/shop/Sidebar";
import BreadCrumb from "@/components/ui/navigation/BreadCrumb";
import { Suspense } from "react";
export default function ShopLayout({ children }) {
  return (
    <Suspense>
      <BreadCrumb currentPage="Shop" />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <Sidebar />
        {children}
      </div>
    </Suspense>
  );
}
