import React, { useEffect, useState } from "react";
import { get } from "../../../../services/api";
import { Link, useLocation } from "react-router-dom";

const NewTask = () => {
  const location = useLocation();
  const [task, setTask] = useState([]);
  const id = localStorage.getItem("emp_id");
  console.log(task);
  useEffect(() => {
    get(`/task/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTask(res.data);
        }
      })
      .catch((error) => {
        console.error(error); // Display the error in the console
      });
  }, []);

  const data = [
    {
      name: "View",
      path: "/view",
    },
  ];
  return (
    <div className="my-10 mx-10 shadow-sm  shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View New Task</h1>
      <table className="w-full">
        <thead className=" text-gray-600 uppercase text-md leading-normal bg-gray-300 ">
          <tr className="">
            <th className="py-3 text-start  px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Task Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Assign To
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Assign Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              End Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Status
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-200">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-[15px] font-medium ">
          {task.map((val, i) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l text-center ">
                {val.task_title}
              </td>
              <td className="py-3 px-4 border-l text-center capitalize">
                {val.emp_name}
              </td>
              <td className="py-3 px-4 border-l text-center">
                {val.task_assign_date}
              </td>
              <td className="py-3 px-4 border-l text-center">
                {val.task_end_date}
              </td>
              <td className="py-3 px-4 border-l capitalize text-center">
                {val.task_priority}
              </td>
              <td className="py-3 px-4 border-l text-center">
                <Link to={`/view/${val.task_id}`} key={i} state={val}>
                  <div
                    className={`py-1 px-2 bg-mainColor font-medium text-white rounded-sm hover:bg-blue-700 `}
                  >
                    View
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewTask;
