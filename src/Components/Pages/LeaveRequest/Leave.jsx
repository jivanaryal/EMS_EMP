import React, { useState } from "react";
// import AddEmployee from "./AddEmployee";
// import ManageEmp from "./ManageEmp";
import ViewLeaveRequest from "./ViewLeaveRequest";
import LeaveRequest from "./LeaveRequest";

const Leave = () => {
  const [Active, setActive] = useState("add");
  const data = [
    {
      id: "add",
      name: "Take Leave",
    },
    {
      id: "view",
      name: "Leave Status",
    },
  ];

  return (
    <div className="">
      <div className="flex pl-10 gap-4 justify-center">
        {data.map((val, i) => {
          return (
            <div key={i}>
              <div
                onClick={() => setActive(val.id)}
                className={`border-2 capitalize py-1  md:px-2 px-1 md:text-xl sm:text-sm text-[14px] cursor-pointer rounded-md w-fit   mt-4
                                    ${
                                      val.id === Active
                                        ? "bg-mainColor  text-[#ffffff] scale-110"
                                        : "bg-[#F6F6F6] text-black  shadow-md font-bold capitalize"
                                    }`}
              >
                {val.name}
              </div>
            </div>
          );
        })}
      </div>

      {Active === "add" ? <LeaveRequest /> : <ViewLeaveRequest />}
    </div>
  );
};

export default Leave;
