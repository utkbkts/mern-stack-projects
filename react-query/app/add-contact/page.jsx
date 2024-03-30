"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addData, updateData } from "@/fetchdata/FetchData";
import { ContextValue } from "@/context/Context";
const AddContact = () => {
  const router = useRouter();
  const inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "fullname",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
    },
    {
      label: "Phone",
      type: "text",
      name: "phonenumber",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
    },
  ];
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    address: "",
    phonenumber: "",
  });
  const { update, setUpdate } = ContextValue();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
  //!update
  const {
    mutateAsync: updateMutate,
    isLoading: updateisLoading,
    isError: updateisError,
  } = useMutation({
    mutationFn: () => updateData(update._id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
  //!update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!update) {
      mutateAsync(form);
    } else {
      await updateMutate(update._id, form);
    }
    router.push("/");
  };
  //!update
  useEffect(() => {
    if (update) {
      setForm(update);
    } else {
      setForm({
        fullname: "",
        email: "",
        address: "",
        phonenumber: "",
      });
    }
  }, [update]);
  return (
    <div className="w-[90%] md:w-[30rem] mx-auto my-[4rem] border border-gray-500 bg-white/10 rounded-md p-4 text-white">
      <span
        className="border cursor-pointer p-2"
        onClick={() => router.push("/")}
      >
        Go Back
      </span>
      <h2 className="pb-2 text-center text-2xl">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((item) => (
          <Input key={item.name} item={item} setForm={setForm} form={form} />
        ))}
        <button className="btn mt-4">{update ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default AddContact;
