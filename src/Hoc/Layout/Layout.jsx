import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Navbar from "../../Components/Navigation/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex ">
      <div className="flex-none w-1/6">
        <div className="sticky top-0 min-h-screen max-h-screen overflow-hidden shadow-xl ">
          <Sidebar />
        </div>
      </div>
      <div
        className="flex-auto z-10"
        style={{
          background:
            "linear-gradient(to right, #f6f6f5, #f8f8f8, #dfdce6, #e1e5ec, #ff9fff)",
        }}
      >
        <div className="z-50 ">
          <Navbar />
        </div>
        <div
          className="relative  mt-[4.1rem] mx-10 -z-10"
          style={{
            background:
              "linear-gradient(to right, #f9f8ff, #f7f9fc, #fcfbf7, #f8f7f9, #f9f8ff)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
