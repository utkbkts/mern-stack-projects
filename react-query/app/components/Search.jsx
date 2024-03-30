"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value.length > 3) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  };
  return (
    <>
      <input
        className="py-2 px-4 rounded-md outline-none text-black bg-white"
        type="text"
        name="search"
        placeholder="Search Full Name"
        id="search"
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
