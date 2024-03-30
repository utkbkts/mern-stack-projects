"use client";
import Navbar from "@/ui/dashboard/navbar/Navbar";
import Sidebar from "@/ui/dashboard/sidebar/Sidebar";
import "../../ui/dashboard/dashboard.scss";
import React, { useState } from "react";
import Footer from "./footer/Footer";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="container">
      {pathname === "/login" ? (
        ""
      ) : (
        <div className="menu">
          <Sidebar />
        </div>
      )}
      <div className="content">
        {pathname === "/login" ? (
          ""
        ) : (
          <div className="menu">
            <Navbar />
          </div>
        )}
        {children}
        {pathname === "/login" ? (
          ""
        ) : (
          <div className="menu">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
