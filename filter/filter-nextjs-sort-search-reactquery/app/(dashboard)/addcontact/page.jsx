"use client";
import Input from "@/components/Input";
import { ContextValue } from "@/context/Context";
import { AddData, UpdateData } from "@/fetchdata/FetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddContact = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "fullName",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Phone No",
      type: "number",
      name: "phoneNumber",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
    },
  ];
  const { update, updateContact } = ContextValue();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const { mutateAsync, error, data, isPending } = useMutation({
    mutationFn: AddData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
  useEffect(() => {
    if (update) {
      setForm(update);
    } else {
      setForm({
        fullName: "",
        email: "",
        address: "",
        phoneNumber: "",
      });
    }
  }, [update]);

  const {
    mutateAsync: updateMutate,
    isPending: updateLoading,
    error: updateError,
  } = useMutation({
    mutationFn: () => UpdateData(update._id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!update) {
      await mutateAsync(form);
    } else {
      await updateMutate(update._id, form);
    }
    router.push("/");
  };
  const loadingText = isPending
    ? "Submitting..."
    : updateLoading
    ? "Updating..."
    : "";
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => router.push("/")}
        className="py-2 px-4 rounded-md bg-blue-600 absolute top-4 left-4"
      >
        Go Back
      </button>
      <div className=" bg-white/10 rounded-md p-4">
        <h1>Add Contact Page</h1>
        <form onSubmit={handleSubmit}>
          {inputs.map((item, i) => (
            <Input item={item} key={i} setForm={setForm} form={form} />
          ))}
          <button
            disabled={isPending}
            type="submit"
            className="mt-[2rem] bg-blue-600/50 w-full p-2 rounded-md hover:bg-blue-700/50"
          >
            {!loadingText ? (update ? "Update" : "Submit") : loadingText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
