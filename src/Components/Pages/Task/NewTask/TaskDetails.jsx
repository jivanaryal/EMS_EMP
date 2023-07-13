import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DangerModal from "../../../UI/DangerModal";

const TaskDetails = () => {
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
        <div className="nav font-bold border-gray-300 p-2">Task Details</div>
        <div className="body border-gray-300 border-t-2">
          <div className=" border-b-2 border-gray-300  grid grid-cols-4 px-2">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Title
            </p>
            <p className="px-2">{location.state.task_title}</p>
          </div>
          <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Priority
            </p>
            <p className="px-2">{location.state.task_priority}</p>
          </div>

          <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Description
            </p>
            <p className="px-2">{location.state.task_description}</p>
          </div>
          <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Assign Date
            </p>
            <p className="px-2">{location.state.task_assign_date}</p>
          </div>
          <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Finish Date
            </p>
            <p className="px-2">{location.state.task_end_date}</p>
          </div>
          {/* remarks */}
          <div className="assign px-2 grid grid-cols-4">
            <p className="font-semibold border-gray-300 border-r-2">
              Employee Final Remarks
            </p>
            <p>Not Updated yet</p>
          </div>
        </div>
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

export default TaskDetails;
