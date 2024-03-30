"use client";
import React from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, removeData } from "@/fetchdata/FetchData";
import Search from "./components/Search";
import { ContextValue } from "@/context/Context";
import { useRouter } from "next/navigation";
const Home = ({ searchParams }) => {
  //!search
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contact"],
    queryFn: getData,
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const { update, setUpdate } = ContextValue();
  const { mutate } = useMutation({
    mutationKey: ["contact"],
    mutationFn: (_id) => removeData(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
  //!update

  const updateContact = (data) => {
    setUpdate(data);
    router.push("/add-contact");
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col gap-4  w-[700px] ">
          <div className="flex items-center w-full justify-between">
            <div>
              <Search />
            </div>
            <Link href={"/add-contact"} className="flex items-end justify-end">
              <button className="py-2 px-4 rounded-md bg-blue-600 text-white hover:opacity-60 transition-all duration-300">
                add contact
              </button>
            </Link>
          </div>
          <div>
            <table className="p-4 overflow-auto w-full">
              <thead>
                <tr className="bg-white/70 h-[4rem] text-black/80">
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {data?.data?.data?.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white/40 h-[3rem] border-b border-black/40 text-center text-white "
                  >
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.address}</td>
                    <td className="flex items-center justify-center gap-4 mt-1 pl-4">
                      <div className="btn" onClick={() => mutate(item._id)}>
                        delete
                      </div>
                      <div onClick={() => updateContact(item)} className="btn">
                        update
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between">
            <button className="border p-2 rounded-md border-white">Prev</button>
            <button className="border p-2 rounded-md border-white">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
