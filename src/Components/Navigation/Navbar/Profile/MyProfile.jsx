import React, { useEffect, useState } from "react";
import { get } from "../../../../services/api";

const ViewSingleEmployee = () => {
  const [singleEmployee, setSingleEmployee] = useState([]);
  const empId = localStorage.getItem("emp_id");

  useEffect(() => {
    get(`/employee/${empId}`)
      .then((res) => {
        setSingleEmployee(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [empId]);

  const employee = singleEmployee[0] || {}; // Ensure a default empty object

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
      <div className="bg-white w-96 capitalize rounded-lg p-8 shadow-md border border-gray-300">
        <div className="text-center mb-4">
          <img
            src={`http://localhost:5000/${employee.image}`}
            alt=""
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-blue-500 text-center">
          Employee Details
        </h1>
        <div className="text-lg mb-2">
          <span className="font-semibold text-gray-600">Employee Id:</span>{" "}
          {employee.emp_id}
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold text-gray-600">Name:</span>{" "}
          {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold text-gray-600">Department:</span>{" "}
          {employee.dept_name}
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold text-gray-600">Gender:</span>{" "}
          {employee.gender}
        </div>
        <div className="text-lg">
          <span className="font-semibold text-gray-600">Salary:</span> $
          {employee.salary}
        </div>
      </div>
    </div>
  );
};

export default ViewSingleEmployee;
