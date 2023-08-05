import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { get } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
// import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebar }) => {
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState([]);
  const storedUserId = localStorage.getItem("emp_id");
  const navbarRef = useRef(null);
  console.log(storedUserId);

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle clicks outside the Navbar component
    const handleClickOutsideNavbar = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutsideNavbar);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutsideNavbar);
    };
  }, [setShow]);

  useEffect(() => {
    get(`/employee/${storedUserId}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  // const navigate = useNavigate();
  return (
    <div
      ref={navbarRef}
      className="h-16 border-2 z-30 border-gray-500 shadow-2xl bg-secondColor text-white fixed top-0 w-full navbar"
      // style={{
      //   background: "linear-gradient(to right, #000460, #004e82)",
      // }}
    >
      <div
        className={`h-full flex items-center
      pl-4  pr-7  ${sidebar ? "justify-around" : "justify-around ml-12"}`}
      >
        {/* search  */}
        <div className="searchbox invisible flex items-center relative border-2  rounded-md ">
          <input
            type="search"
            className="text-black focus:outline-none p-2 pl-10 font-4xl "
            placeholder="search.."
          />
          <GoSearch className="absolute left-3 text-black" />
        </div>
        {/* profile */}

        {employee.map((val, i) => {
          return (
            <div className="flex relative  items-center gap-3">
              <div className="font-bold text-lg md:block hidden">
                {val.first_name} {val.middle_name} {val.last_name}
              </div>
              <div className=" rounded-full ">
                <img
                  src={`http://localhost:5000/${val.image}`}
                  alt="logo"
                  className=" w-12 h-12 rounded-full border-2 sm:block hidden "
                />
              </div>
              <div className=" ">
                <MdKeyboardArrowDown
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="text-4xl sm:mr-0 mr-24  cursor-pointer "
                />

                {show && (
                  <div className="w-56 text-black bg-white rounded-md shadow-sm shadow-gray-400 absolute top-[3.4rem]  right-[1px] -z-50  cursor-pointer border-1 border-gray-300 py-2 px-3">
                    <div>
                      <Profile />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
