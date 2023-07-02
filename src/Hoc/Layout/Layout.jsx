import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Navbar from "../../Components/Navigation/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex-none w-1/6">
        <div className="sticky top-0 min-h-screen max-h-screen overflow-hidden shadow-xl ">
          <Sidebar />
        </div>
      </div>
      <div className="flex-auto z-10">
        <div className="z-50">
          <Navbar />
        </div>
        <div className="relative pl-2 mt-24 -z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
