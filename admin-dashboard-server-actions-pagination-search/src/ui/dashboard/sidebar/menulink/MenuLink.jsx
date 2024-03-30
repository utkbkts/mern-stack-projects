"use client";

import React from "react";
import Link from "next/link";
import "./menulink.scss";
import { usePathname } from "next/navigation";
const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`menuLinkContainer ${pathname == item.path ? "active" : ""}`}
    >
      {item.icon} {item.title}
    </Link>
  );
};

export default MenuLink;
