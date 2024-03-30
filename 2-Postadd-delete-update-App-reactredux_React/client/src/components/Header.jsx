import React, { useState } from "react";
import Modal from "./Modal";
import Home from "../pages/home/Home";
import { useSelector } from "react-redux";

const Header = () => {
  const [modal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { posts } = useSelector((state) => state.post);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="w-full h-[14vh] bg-slate-600 flex items-center">
      <div className="flex items-center justify-between w-full px-6">
        <div>
          <h1 className="text-white">SHARE POST APP</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              placeholder="Search"
              className="py-2 px-4 outline-none border-white w-full"
              type="text"
              name="search"
              value={searchText}
              onChange={handleSearchChange}
            />
            <button className="py-2 px-4 bg-[#0d6efd] text-white">
              Search
            </button>
          </div>
          <button onClick={() => setModal(true)} className="btn-primary btn">
            Create Post
          </button>
          <button className="btn-danger btn">LOGOUT</button>
        </div>
      </div>
      {modal && <Modal setModal={setModal} />}
    </div>
  );
};

export default Header;
