import Image from "next/image";
import Link from "next/link";

const DropdownLink = ({ category }) => {
  const { name, icon, id } = category || {};
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(id)}`}
      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
    >
      <Image
        width={20}
        height={20}
        src={`/assets/images/icons/${icon}`}
        alt={name}
        className="size-10 object-contain"
      />
      <span className="ml-6 text-gray-600 text-sm">{name}</span>
    </Link>
  );
};

export default DropdownLink;
