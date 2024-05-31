"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const CategoryFilter = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [queryParams, setQueryParams] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  //handle checkbo change
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        // Add the category to the state
        return [...prev, name];
      } else {
        // Remove the category from the state
        return prev.filter((category) => category !== name);
      }
    });
  };

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

  // check search params for filter
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories(categoryParam.trim().split(" "));
    }
  }, [searchParams]);

  //change route acorrding to filter
  useEffect(() => {
    router.push(
      pathname +
        "?" +
        createQueryString("category", selectedCategories.join(" "))
    );
  }, [createQueryString, pathname, router, selectedCategories]);

  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {categories?.length > 0 &&
          categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                name={category?.id}
                id={category?.link}
                checked={selectedCategories.includes(category?.id)}
                onChange={handleChange}
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor={category?.link}
                className="text-gray-600 ml-3 cusror-pointer"
              >
                {category.name}
              </label>
              <div className="ml-auto text-gray-600 text-sm">
                ({category?.productCount})
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
