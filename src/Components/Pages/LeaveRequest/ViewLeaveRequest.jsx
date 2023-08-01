import React, { useState, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import "react-toastify/dist/ReactToastify.css";

const ViewLeaveRequest = () => {
  const storedUserId = localStorage.getItem("emp_id");
  const [info, setInfo] = useState([]);
  // const navigate = useNavigate();
  const [toggle, setToggle] = useState([]);

  const fetchData = async () => {
    try {
      const res = await get(`/leave/approve/${storedUserId}`);
      console.log(res.data);
      setInfo(res.data);
    } catch (error) {
      console.error(error); // Display the error in the console
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const filterInfo = info.filter((val) => val.status === "pending");

  const newData = useMemo(() => newCallBack(), [toggle]);
  return (
    <div className="my-10 mx-10 shadow-sm shadow-gray-400 p-4">
      <Link to="/leave/history">
        <div className="border-2 absolute right-4 top-[-1px] capitalize py-2  shadow-md px-4 text-xl font-bold   cursor-pointer rounded-md w-fit   mt-4 hover:bg-mainColor">
          Leave History
        </div>
      </Link>
      <h1 className="font-bold text-xl">View Leave</h1>
      <table className="w-full rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2 text-start px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-2 px-6 border-r border-b border-gray-200">
              Start Date
            </th>
            <th className="py-2 px-6 border-r border-b border-gray-200">
              End Date
            </th>
            <th className="py-2 px-6 border-r border-b border-gray-200">
              Message
            </th>
            <th className="py-2 px-6 border-r border-b border-gray-200">
              Status
            </th>
            <th className="py-2 px-6 border-r border-b border-gray-200">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-bold">
          {filterInfo.map((val, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100 ">
              <td className="py-2 px-4 border-l text-center">{i + 1}</td>
              <td className="py-2 px-4 border-l border-r">{val.start_date}</td>
              <td className="py-2 px-4 border-l border-r">{val.end_date}</td>
              <td className="py-2 px-4 border-l text-center">{val.message}</td>
              <td
                className={`py-2 px-4 border-l border-r text-base  text-center font-black capitalize ${
                  val.status === "rejected" && "text-red-700"
                } ${val.status === "approved" && "text-green-700"}`}
              >
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
                  className={`text-3xl ${
                    val.status === "rejected" || val.status === "approved"
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                  }`}
                />

                <Link
                  // ...
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
                  <MdOutlineUpdate className="text-3xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer className="mt-11 text-sm " />
    </div>
  );
};

export default ViewLeaveRequest;
