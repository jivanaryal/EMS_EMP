import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiTask, BiTaskX } from "react-icons/bi";
import logo from "../../../assests/Images/logo.png";
import { MdDashboard, MdTaskAlt } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { GrInProgress } from "react-icons/gr";

const SideBar = ({ sidebar }) => {
  const location = useLocation();
  const [expandedOption, setExpandedOption] = useState("");

  const toggleDropdown = (name) => {
    if (expandedOption === name) {
      setExpandedOption("");
    } else {
      setExpandedOption(name);
    }
  };

  const NavData = [
    {
      icon: <MdDashboard />,
      title: "dashboard",
      path: "/",
    },

    {
      icon: <FcLeave />,
      title: "leave",
      path: "/leave",
    },
    {
      icon: <BiTask />,
      title: "task",
      path: null,
      options: [
        {
          icon: <BiTaskX />,
          title: "New Task",
          path: "/task/new",
        },
        {
          icon: <GrInProgress />,
          title: "In Progress Task",
          path: "/task/inprogress",
        },
        {
          icon: <MdTaskAlt />,
          title: "Completed Task",
          path: "/task/completed",
        },
      ],
    },
  ];
  return (
    <div className="pl-5  h-screen bg-mainColor text-white">
      <div
        className={` text-[#FDF7FF] flex justify-center   font-extrabold py-1 ${
          sidebar === false && "hidden"
        }`}
      >
        <img src={logo} alt="logo" className="h-16 w-20 " />
      </div>
      <div className={`text-[#e2cefd] p-5 ${sidebar === false && "invisible"}`}>
        MAIN MENU
      </div>
      <div className="flex flex-col h-full gap-5">
        {NavData.map((val, i) => (
          <div key={i} className=" shadow-sm  mr-4">
            <Link to={val.path}>
              {" "}
              <div
                className={`flex md:px-3 pl-1 pr-0 md:py-3 py-1  shadow-base rounded-md   items-center mr-4 text-base  border-[1px] text-center  gap-2 capitalize    ${
                  location.pathname === val.path &&
                  " bg-[#F6F6F6] text-black  shadow-md font-bold capitalize"
                }`}
                onClick={() => toggleDropdown(val.title)}
              >
                <div className="text-xl ">{val.icon}</div>
                <div className={`text-sm  ${sidebar ? "block" : "hidden"}`}>
                  {val.title}
                </div>
              </div>
            </Link>
            {val.options && expandedOption === val.title && (
              <div className="pl-4 border-[1px] border-gray-500 shadow-md shadow-gray-500">
                {val.options.map((option, index) => (
                  <Link to={option.path} key={index}>
                    <div
                      className={`flex py-2 border-2 items-centerflex pl-2 my-2 rounded-lg items-center  text-base  ${
                        location.pathname === option.path &&
                        "bg-[#F6F6F6] text-black  shadow-md font-bold capitalize"
                      }`}
                    >
                      <div className="mr-2">{option.icon}</div>
                      <div
                        className={`text-sm ${sidebar ? "block" : "hidden"}`}
                      >
                        {option.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
