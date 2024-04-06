"use client";
import { ContextValue } from "@/context/Context";
import { RemoveData } from "@/fetchdata/FetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SingleContact = ({ item }) => {
  const { fullName, email, phoneNumber, address, _id } = item;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { updateContact } = ContextValue();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["contact", _id],
    mutationFn: () => RemoveData(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });

  const updatedContact = (data) => {
    updateContact(data);
    router.push("/addcontact");
  };
  return (
    <tr className="bg-white/40 h-[3rem] border-b border-black/40 text-center">
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{address}</td>
      <td className="flex items-center gap-4 text-xl mt-[1rem] justify-center">
        <span
          onClick={() => mutate(_id)}
          className="cursor-pointer hover:opacity-70"
        >
          <Trash2 />
        </span>
        <span
          onClick={() => updatedContact(item)}
          className="cursor-pointer hover:opacity-70"
        >
          <Pencil />
        </span>
      </td>
    </tr>
  );
};

export default SingleContact;
