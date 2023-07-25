import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { get } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [Arrow, setArrow] = useState(false);
  const [employee, setEmployee] = useState([]);
  const storedUserId = localStorage.getItem("emp_id");
  console.log(storedUserId);

  const navigate = useNavigate();

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
    <div className="h-16 border-2 z-30  shadow-lg fixed top-0 w-full bg-secondColor navbar">
      <div
        className="w-full h-full flex items-center
      pl-4 justify-around pr-7"
      >
        {/* search  */}
        <div className="searchbox invisible flex items-center relative border-2 border-gray-200 rounded-md ">
          <input
            type="search"
            className="text-black focus:outline-none p-2 pl-10 font-4xl bg-[#FAFAFA]"
            placeholder="search.."
          />
          <GoSearch className="absolute left-3 text-black" />
        </div>
        {/* profile */}

        {employee.map((val, i) => {
          return (
            <div className="flex relative  items-center gap-3">
              <div className="font-bold text-lg">
                {val.first_name} {val.middle_name} {val.last_name}
              </div>
              <div className=" rounded-full ">
                <img
                  src={`http://localhost:5000/${val.image}`}
                  alt="logo"
                  className=" w-12 h-12 rounded-full border-2"
                />
              </div>
              <div className=" ">
                {Arrow ? (
                  <MdKeyboardArrowDown
                    onClick={() => {
                      setArrow(!Arrow);
                      setShow(!show);
                    }}
                    className="text-4xl  cursor-pointer "
                  />
                ) : (
                  <MdKeyboardArrowUp
                    onClick={() => {
                      setArrow(!Arrow);
                      setShow(!show);
                    }}
                    className="text-4xl  cursor-pointer "
                  />
                )}

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
