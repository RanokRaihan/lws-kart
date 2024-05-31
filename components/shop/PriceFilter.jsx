"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // check search params for filter
  useEffect(() => {
    const minpriceParam = searchParams.get("minprice");
    const maxpriceParam = searchParams.get("maxprice");
    if (minpriceParam) {
      setMinPrice(minpriceParam.trim());
    }
    if (maxpriceParam) {
      setMaxPrice(maxpriceParam.trim());
    }
  }, [searchParams]);

  //create a query string
  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     if (value) {
  //       params.set(name, value);
  //     } else {
  //       params.delete(name);
  //     }

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const createQueryString = useCallback(
    (paramsObject) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsObject).forEach(([name, value]) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  //handle blur
  const handleBlur = () => {
    router.push(
      pathname +
        "?" +
        createQueryString({ minprice: minPrice, maxprice: maxPrice })
    );
  };

  // useEffect(() => {
  //   router.push(pathname + "?" + createQueryString("minprice", minPrice));
  // }, [createQueryString, minPrice, pathname, router]);
  // useEffect(() => {
  //   router.push(pathname + "?" + createQueryString("maxprice", maxPrice));
  // }, [createQueryString, maxPrice, pathname, router]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Price
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          pattern="[0-9]*"
          name="min"
          id="min"
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handleBlur}
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="text"
          pattern="[0-9]*"
          name="max"
          id="max"
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
