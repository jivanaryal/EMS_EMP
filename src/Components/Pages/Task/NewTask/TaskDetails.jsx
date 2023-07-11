import React from "react";

const TaskDetails = () => {
  // Sample task data from backend
  const taskData = [
    {
      title: "Prepare bill for laptop",
      assignDate: "2023-07-15",
      finishDate: "2023-07-20",
      description: "Detailed description goes here",
      remark: "Additional remarks",
    },
    // Add more task objects as needed
  ];

  return (
    <div className="my-10 mx-10 shadow-sm shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View Task Details</h1>
      <div className="container border-gray-300 border-2">
        <div className="nav font-bold border-gray-300 p-2">Task Details</div>
        <div className="body border-gray-300 border-t-2">
          <div className="frow grid grid-cols-4 border-b-2 border-gray-300 text-start ">
            <p className="font-semibold border-gray-300 border-r-2 px-2">
              Task TItle
            </p>
            <p>Prepare Bill for laptop</p>
            <p className="font-semibold">Task Priority</p>
            <p>MOst Urgent</p>
          </div>
          <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Description
            </p>
            <p>create Bill for Laptop</p>
          </div>
          <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Assign Date
            </p>
            <p>23/12/2022</p>
          </div>
          <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-300">
            <p className="font-semibold border-gray-300 border-r-2">
              Task Finish Date
            </p>
            <p>26/12/2022</p>
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
        <button className="bg-mainColor text-white rounded-sm p-2">
          Take Action
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
