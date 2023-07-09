import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

import { GiArchiveRegister } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";

const Navdata = [
  {
    title: "dashboard",
    path: "/",
    logo: <MdDashboard />,
  },

  {
    title: "attendance",
    path: "/attendance",
    logo: <GiArchiveRegister />,
  },
  {
    title: "leave",
    path: "/leave",
    logo: <FcLeave />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="pl-5 h-full">
      <div className="text-4xl text-center font-extrabold pb-5 flex">EMP</div>
      <div className="text-gray-500 py-6">MAIN MENU</div>
      <div className="flex flex-col h-full gap-8 ">
        {Navdata.map((val, i) => {
          return (
            <Link to={val.path}>
              {" "}
              <div
                className={`flex w-full items-center text-base text-gray-700  gap-2 capitalize ${
                  location.pathname === val.path && "text-red-500"
                }`}
              >
                <div className=" ">{val.logo}</div>
                <div className="">{val.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
