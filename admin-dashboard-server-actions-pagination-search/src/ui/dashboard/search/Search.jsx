"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./search.scss";
import { MdSearch } from "react-icons/md";
const Search = ({ placeholder }) => {
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
    <div className="ContainerSearch">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={"input"}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
