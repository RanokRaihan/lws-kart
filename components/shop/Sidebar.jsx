import { getAllCategory } from "@/database/productQuery";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

const Sidebar = async () => {
  const categories = await getAllCategory();
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <div className="divide-y divide-gray-200 space-y-5">
        <CategoryFilter categories={categories} />
        <PriceFilter />
        <SizeFilter />
        <Link
          className="bg-red-500 text-white px-4 py-2 rounded-md inline-block"
          href="/shop"
        >
          Clear filter
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
