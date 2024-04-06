import React from "react";

const Input = ({ item, setForm, form }) => {
  const { label, type, name } = item;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-2 w-[400px]">
      <label className="text-sm p-2">{label}</label>
      <input
        className="p-3 bg-white/20 outline-none text-sm rounded-md"
        type={type}
        value={form[name]}
        onChange={handleOnChange}
        name={name}
        placeholder={`${name}...`}
      />
    </div>
  );
};

export default Input;
