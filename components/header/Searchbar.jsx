"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push("/shop?" + createQueryString("search", searchText));
    }
  };
  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl relative flex ">
      <span className="absolute left-4 top-3 text-lg text-gray-400">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="size-6" />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
        placeholder="search"
      />
      <button
        type="submit"
        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
