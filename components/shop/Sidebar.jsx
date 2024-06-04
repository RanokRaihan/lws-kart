import { getAllCategory } from "@/database/productQuery";
import CategoryFilter from "./CategoryFilter";
import ClearButton from "./ClearButton";
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
        <ClearButton />
      </div>
    </div>
  );
};

export default Sidebar;
