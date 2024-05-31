import { getAllCategory } from "@/database/productQuery";
import CategoryCard from "./CategoryCard";

const Categories = async () => {
  const allCategory = await getAllCategory();
  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3 items-center">
        {allCategory?.length > 0 &&
          allCategory.map((category) => (
            <CategoryCard key={category?._id?.toString()} category={category} />
          ))}
      </div>
    </div>
  );
};

export default Categories;
