"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import "./navbar.scss";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="Navbarcontainer">
      <div className="title">{pathname.split("/").pop()}</div>
      <div className="menu">
        <div className="search">
          <MdSearch />
          <input type="text" placeholder="Search..." className="input" />
        </div>
        <div className="icons">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
