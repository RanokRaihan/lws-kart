import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  // destructure the categoy and use in component
  return (
    <div className="relative rounded-sm overflow-hidden group">
      <Image
        src="/assets/images/category/category-1.jpg"
        alt="category 1"
        className="w-full"
        width={400}
        height={250}
      />
      <Link
        href="#"
        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
      >
        Bedroom
      </Link>
    </div>
  );
};

export default CategoryCard;
