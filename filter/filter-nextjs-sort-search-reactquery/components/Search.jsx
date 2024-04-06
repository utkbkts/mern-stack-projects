"use client";
import { GetData } from "@/fetchdata/FetchData";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
    setSearchValue(value);
  };

  return (
    <input
      onChange={handleChange}
      type="text"
      name="search"
      placeholder="Full Name and Email Search..."
      className="py-2 px-4 rounded-md text-black outline-none"
    />
  );
};

export default Search;
