import React, { useEffect, useState } from "react";
import { get } from "../../../services/api";

const NewTask = () => {
  const [task, setTask] = useState([]);
  const id = localStorage.getItem("emp_id");
  console.log(task);
  useEffect(() => {
    get(`/task/${id}`).then((res) => {
      if (res.status === 200) {
        setTask(res.data);
      }
    });
  }, []);
  return (
    <div className="my-10 mx-10 shadow-sm shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View New Task</h1>{" "}
      <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th className="py-3 text-start px-6 border-r border-b border-gray-200">
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
      <tbody className="text-gray-600 text-sm font-light">
        {task.map((val, i) => (
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-4 border-l text-center">{i + 1}</td>
            <td className="py-3 px-4 border-l text-center">{val.task_title}</td>
            <td className="py-3 px-4 border-l text-center">{val.emp_name}</td>
            <td className="py-3 px-4 border-l text-center">
              {val.task_assign_date}
            </td>
            <td className="py-3 px-4 border-l text-center">
              {val.task_end_date}
            </td>
            <td className="py-3 px-4 border-l text-center">
              {val.task_priority}
            </td>
            <td className="py-3 px-4 border-l text-center">
              <button className="py-1 px-2 bg-mainColor font-medium text-white rounded-sm">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default NewTask;
