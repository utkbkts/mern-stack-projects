"use client";
import Search from "@/components/Search";
import SingleContact from "@/components/SingleContact";
import { GetData } from "@/fetchdata/FetchData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const HomePage = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const [sortOption, setSortOption] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["contact"],
    queryFn: () => GetData(),
  });

  const sortedData = useMemo(() => {
    if (!data) return [];
    let sortedContacts = [...data.getContacts];

    if (sortOption === "alphabetically") {
      sortedContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortOption === "recent") {
      sortedContacts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return sortedContacts;
  }, [data, sortOption]);

  const filteredData = useMemo(() => {
    if (!sortedData) return [];
    return sortedData.filter(
      (item) =>
        item.fullName.toLowerCase().includes(q.toLowerCase()) ||
        item.email.toLowerCase().includes(q.toLowerCase())
    );
  }, [sortedData, q]);

  return (
    <div className="flex items-center justify-center h-auto mt-12 w-full container mx-auto pb-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <Search />
          </div>
          <Link href={"/addcontact"}>
            <span className="p-2 py-3 bg-blue-600 rounded-md hover:bg-blue-700/50 transition duration-300">
              Add Contact
            </span>
          </Link>
        </div>
        <div className="mt-2">
          <h1 className="text-center text-3xl py-4 uppercase">
            SEARCH & SORT PROJECT <br /> <span>NEXT.JS 14.1.4</span> <br />
            <span>REACT QUERY</span>
          </h1>
          <div className="flex items-center justify-between">
            <h1 className="text-white">
              There Are ({data?.getContacts.length}) Data
            </h1>
            <span className="w-[200px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full outline-none text-black py-2 px-4"
                name=""
                id=""
              >
                <option value="">Sort By</option>
                <option value="alphabetically">a-A-z-Z</option>
                <option value="recent">Most Recent</option>
              </select>
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-white/70 h-[4rem] text-black/80 ">
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>{isPending ? <td>Loading...</td> : null}</tr>
              {filteredData?.map((item) => (
                <SingleContact item={item} key={item.id} />
              ))}
            </tbody>
          </table>
          {data?.getContacts.length === 0 && (
            <p className="text-center pt-4 pb-4 text-2xl">No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
