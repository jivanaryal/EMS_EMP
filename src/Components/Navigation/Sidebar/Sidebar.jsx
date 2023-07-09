import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import logo from "../../../assests/Images/logo.png";
import { MdDashboard } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { GiArchiveRegister } from "react-icons/gi";

const SideBar = () => {
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
      icon: <GiArchiveRegister />,
      title: "attendance",
      path: "/attendance",
    },
    {
      icon: <FcLeave />,
      title: "leave",
      path: "/leave",
    },
    {
      icon: <BiTask />,
      title: "task",
      path: "/task",
      options: [
        {
          icon: null,
          title: "New Task",
          path: "/task/new",
        },
        {
          icon: null,
          title: "In Progress Task",
          path: "/task/inprogress",
        },
        {
          icon: null,
          title: "Completed Task",
          path: "/task/completed",
        },
      ],
    },
  ];

  return (
    <div className="pl-5  h-screen bg-gray-900 text-white">
      <div className=" text-[#FDF7FF] flex justify-center font-extrabold py-8">
        <img src={logo} alt="logo" className="h-20 w-20 bg-transparent" />
      </div>
      <div className="text-purple-100 pb-4">MAIN MENU</div>
      <div className="flex flex-col h-full gap-4">
        {NavData.map((val, i) => (
          <div key={i} className=" shadow-sm shadow-gray-600 mr-4">
            <Link to={val.path}>
              {" "}
              <div
                className={`flex  pl-4 py-3 rounded-lg items-center  text-base text-purple-200 bg-gray-800 hover:bg-gray-700 ${
                  location.pathname === val.path &&
                  "text-gray-700 bg-mainColor shadow-md font-bold"
                }`}
                onClick={() => toggleDropdown(val.title)}
              >
                <div className="text-xl">{val.icon}</div>
                <div className="ml-2">{val.title}</div>
              </div>
            </Link>
            {val.options && expandedOption === val.title && (
              <div className="pl-4">
                {val.options.map((option, index) => (
                  <Link to={option.path} key={index}>
                    <div className="flex py-2 items-centerflex pl-2 my-2 rounded-lg items-center  text-base text-purple-200 bg-gray-800 hover:bg-gray-700 ">
                      <div className="mr-2">{option.icon}</div>
                      <div>{option.title}</div>
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
