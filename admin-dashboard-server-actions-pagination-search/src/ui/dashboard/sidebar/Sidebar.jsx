"use client";
import React from "react";
import "./sidebar.scss";
import { MenuItems } from "@/utils/SİdebarConfig";
import MenuLink from "./menulink/MenuLink";
import Image from "next/image";

import girl2 from "../../../image/girl2.jpg";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="SidebarContainer">
      <div className="user">
        <Image
          className="userImage"
          src={girl2}
          alt="image"
          width={50}
          height={50}
        />
        <div className="userdetail">
          <span className="username">John Doe</span>
          <span className="usertitle">Administrator</span>
        </div>
      </div>
      <ul className="list">
        {MenuItems.map((category) => (
          <li key={category.title}>
            <span className="category">{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className="logout">
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
