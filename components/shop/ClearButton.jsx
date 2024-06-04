"use client";

import { usePathname, useRouter } from "next/navigation";

const ClearButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClear = async () => {
    router.push(`${pathname}`);
    await clearFilter();
  };
  return (
    <div className="pt-4">
      <button
        onClick={handleClear}
        className="bg-red-500 text-white px-4 py-2 rounded-md inline-block"
      >
        clear filter
      </button>
    </div>
  );
};

export default ClearButton;
