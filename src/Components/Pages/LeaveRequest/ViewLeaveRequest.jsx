import React, { useState, useEffect } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import "react-toastify/dist/ReactToastify.css";

const ViewLeaveRequest = () => {
  const storedUserId = localStorage.getItem("emp_id");
  const [info, setInfo] = useState([]);
  const [toggle, setToggle] = useState([]);

  const fetchData = async () => {
    try {
      const res = await get(`/leave/approve/${storedUserId}`);
      setInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toggle]);

  const deleteItem = (id) => {
    remove(`/leave/request/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setToggle(!toggle);
          toast.error("The item is removed", {
            className: "custom-toast",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterInfo = info.filter((val) => val.status === "pending");

  return (
    <div className="p-4 shadow-sm shadow-gray-400 ">
      <Link to="/leave/history" className="mb-6">
        <div className="border-2 absolute right-4   capitalize md:py-2 py-1  shadow-md md:px-4 px-1 md:text-xl text-sm font-bold  shadow-mainColor cursor-pointer rounded-md w-fit    hover:bg-mainColor hover:text-white">
          Leave History
        </div>
      </Link>
      <h1 className="font-bold text-xl">View Leave</h1>
      <div className="overflow-x-auto mt-10">
        <table className="w-full rounded-lg shadow-sm">
          <thead className="bg-mainColor text-white uppercase md:text-sm text-[10px]  leading-normal">
            <tr>
              <th className=" text-start px-6 border-r border-b border-gray-200 ">
                S.No
              </th>
              <th className="py-2  border-r border-b border-gray-200">
                Start Date
              </th>
              <th className="py-2  border-r border-b border-gray-200">
                End Date
              </th>
              <th className="py-2 px-6 border-r border-b border-gray-200 hidden md:table-cell">
                Message
              </th>
              <th className="py-2 px-6 border-r border-b border-gray-200 hidden md:table-cell">
                Status
              </th>
              <th className="py-2  border-r border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 md:text-sm text-[10px] font-bold">
            {filterInfo.map((val, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100 "
              >
                <td className="py-2 px-4 border-l text-center">{i + 1}</td>
                <td className="py-2 px-4 border-l border-r">
                  {val.start_date}
                </td>
                <td className="py-2 px-4 border-l border-r">{val.end_date}</td>
                <td className="py-2 px-4 border-l text-center hidden md:table-cell">
                  {val.message}
                </td>
                <td className="py-2 px-4 border-l border-r text-base text-center font-black capitalize hidden md:table-cell">
                  {val.status}
                </td>
                <td className="py-2 px-4 border-l border-r text-center flex justify-center gap-2">
                  <MdDelete
                    onClick={() => {
                      if (
                        val.status !== "rejected" &&
                        val.status !== "approved"
                      ) {
                        deleteItem(val.leave_id);
                      }
                    }}
                    className={`md:text-3xl text-xl ${
                      val.status === "rejected" || val.status === "approved"
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                    }`}
                  />
                  <Link
                    className={`hover:scale-110 transition-all delay-100 duration-300 ${
                      val.status === "rejected" || val.status === "approved"
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:text-blue-500"
                    }`}
                    to={{
                      pathname: `edit/${val.leave_id}`,
                    }}
                    state={val}
                  >
                    <MdOutlineUpdate className="md:text-3xl text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer className="mt-8 text-sm" />
    </div>
  );
};

export default ViewLeaveRequest;
