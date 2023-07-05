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
    get(`/leave/approve/${storedUserId}`).then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const deleteItem = (id) => {
    remove(`/leave/request/${storedUserId}`).then((res) => {
      if (res.status === 200) {
        setToggle(!toggle);
        toast.error("The department is removed", {
          className: "custom-toast",
        });
      }
    });
  };

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);
  return (
    <div className="my-10 mx-10">
      <h1 className="font-bold text-xl">Manage Department</h1>
      <table className="w-full rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 text-start px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Emloyee Name
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              start date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              End date
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-200">
              Delete
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {info.map((val, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l text-center">
                {val.first_name}
                {val.middle_name}
                {val.last_name}
              </td>
              <td className="py-3 px-4 border-l border-r">{val.end_date}</td>
              <td className="py-3 px-4 border-l border-r">{val.status}</td>
              <td className="py-3 px-4 border-l border-r text-center">
                <MdDelete
                  onClick={() => deleteItem(val.dept_id)}
                  className="text-3xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300"
                />
              </td>
              <td className="py-3 px-4 border-l border-r text-center">
                <Link
                  state={val}
                  className="hover:scale-110 transition-all delay-100 duration-300 hover:text-blue-500"
                  to={{
                    pathname: `/department/${val.dept_id}`,
                  }}
                >
                  <MdOutlineUpdate className="text-3xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default ViewLeaveRequest;
