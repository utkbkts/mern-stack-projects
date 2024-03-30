import React from "react";

const Input = ({ item, form, setForm }) => {
  const { label, type, name } = item;

  const handleChange = (e) => {
    return setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="">{label}</label>
      <input
        className="py-2 outline-none px-4 rounded-md text-black"
        type={type}
        name={name}
        value={form[name]}
        placeholder={`${name}...`}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
