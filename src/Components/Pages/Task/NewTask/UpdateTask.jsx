import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DangerModal from "../../../UI/DangerModal";

const UpdateTask = () => {
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false);

  const success = () => {
    console.log("hello");
  };

  const failure = () => {
    setShowDelete(false);
  };

  console.log(location.state);

  return (
    <div className="my-10 mx-10 shadow-sm shadow-gray-400 p-4">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="employee"
        />
      )}
      <h1 className="font-bold text-xl mb-4">View Task Details</h1>
      <div className="container border-gray-300 border-2">
        <div className="nav font-extrabold text-xl border-gray-300 p-2 bg-gray-200 ">
          Task Details
        </div>
        <div className="body border-gray-300 border-t-2 ">
          <div className=" border-b-2 border-gray-300  grid grid-cols-4 px-2 hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 w-full py-3">
              Task Title
            </p>
            <p className="px-2 py-3">{location.state.task_title}</p>
          </div>
          <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 py-3">
              Task Priority
            </p>
            <p className="px-2 py-3">{location.state.task_priority}</p>
          </div>

          <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 py-3">
              Task Description
            </p>
            <p className="px-2 py-3">{location.state.task_description}</p>
          </div>
          <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 py-3">
              Task Assign Date
            </p>
            <p className="px-2 py-3">{location.state.task_assign_date}</p>
          </div>
          <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 py-3">
              Task Finish Date
            </p>
            <p className="px-2 py-3">{location.state.task_end_date}</p>
          </div>
          {/* remarks */}
          <div className="assign px-2 grid grid-cols-4  hover:bg-gray-100">
            <p className="font-semibold border-gray-300 border-r-2 py-3">
              Employee Final Remarks
            </p>
            <p className="capitalize py-3">{location.state.emp_final_remark}</p>
          </div>
        </div>
      </div>
      {/* Task HIstory */}
      <div className=" border-gray-300 border-2 mt-4">
        <p className="p-2 text-center font-bold text-lg"> Task History</p>
        <table className="w-full mb-2 border-2 border-gray-200">
          <thead className=" bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 border-r border-b border-gray-200">
                SN.
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Remarks
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Status
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Task Progess
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l border-r">1</td>
              <td className="py-3 px-4 border-l border-r">
                Preparing the bills
              </td>
              <td className="py-3 px-4 border-l border-r text-center">
                inProgress
              </td>
              <td className="py-3 px-4 border-l border-r">Task Progress</td>
              <td className="py-3 px-4 border-l border-r">20/12/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn text-center mt-4 ">
        <button
          className="bg-mainColor text-white rounded-sm p-2"
          onClick={() => {
            setShowDelete(true);
          }}
        >
          Take Action
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
