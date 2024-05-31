"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SizeFilter = () => {
  const [size, setSize] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  //create a query string
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  //get size param if available
  useEffect(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      setSize(sizeParam.trim());
    } else {
      setSize(null);
    }
  }, [searchParams]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("size", size));
  }, [createQueryString, pathname, router, size]);

  //handle size filter change
  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
  };

  //handle reset size filter
  const handleClick = (e) => {
    const newSize = e.target.value;
    if (size === newSize) {
      setSize(null);
    }
  };

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Size</h3>
      <div className="flex items-center gap-2">
        {["xs", "sm", "m", "l", "xl", "xxl"].map((sizeOption) => (
          <div className="size-selector" key={sizeOption}>
            <input
              type="radio"
              name="size"
              id={`size-${sizeOption}`}
              className="hidden"
              value={sizeOption}
              checked={size === sizeOption}
              onChange={handleSizeChange}
              onClick={handleClick}
            />
            <label
              htmlFor={`size-${sizeOption}`}
              className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
            >
              {sizeOption.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
