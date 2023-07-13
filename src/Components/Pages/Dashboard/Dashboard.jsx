import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";
import { get } from "../../../services/api";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [singleEmployee, setSingleEmployee] = useState([]);
  const [employee, setEmployee] = useState([]);
  const storedUserId = localStorage.getItem("emp_id");

  useEffect(() => {
    get(`/leave/approve/${storedUserId}`)
      .then((res) => {
        if (res.status === 200) {
          setEmployee(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    get(`/employee/${storedUserId}`)
      .then((res) => {
        setSingleEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <UserAuthContextApi>
      <UserAuthContext.Provider>
        <div className="grid grid-cols-2 gap-32">
          <div
            div
            className=" shadow-gray-400 shadow-md grid place-content-center w-full"
          >
            {singleEmployee.map((val, i) => (
              <div className=" bg-white capitalize rounded-lg px-10">
                <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
                <div className="mb-4">
                  <span className="text-gray-500 font-semibold"></span>{" "}
                  <img
                    src={`http://192.168.18.7:5000/${val.image}`}
                    alt=""
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div className="mb-4 text-2xl">
                  <span className="text-gray-500 font-semibold">Name:</span>{" "}
                  {val.first_name} {val.middle_name} {val.last_name}
                </div>
                <div className="mb-4 text-2xl">
                  <span className="text-gray-500 font-semibold">
                    Department:
                  </span>{" "}
                  {val.dept_name}
                </div>
                <div className="mb-4 text-2xl">
                  <span className="text-gray-500 font-semibold">Gender:</span>{" "}
                  {val.gender}
                </div>
                <div className="mb-2 text-2xl">
                  <span className="text-gray-500 font-semibold">Salary:</span>{" "}
                  {val.salary}
                </div>
              </div>
            ))}
          </div>
          <div className="w-11/12  shadow-gray-400 shadow-md p-5">
            <PieChart employee={employee} />
          </div>
          {/* <div className="employee_data pl-6 shadow-sm  shadow-mainColor w-full  rounded-lg  ">
            <h1 className="text-2xl font-bold mb-8 pt-6 mt-4">
              Top Salary Employees
            </h1>
            <div className="w-full">
              {singleEmployee.map((emp, index) => (
                <div key={index} className="flex items-center mb-4 w-full">
                  <img
                    src={`http://localhost:5000/${emp.image}`}
                    alt="Employee"
                    className="w-12 h-12 rounded-full mr-5"
                  />
                  <div className="grid w-full grid-cols-4 gap-4  text-sm text-[#5E5E5E] font-bold items-center">
                    <div className="text-gray-700 capitalize ">
                      {emp.first_name} {emp.middle_name} {emp.last_name}
                    </div>
                    <div>{emp.dept_name}</div>
                    <div>{emp.job}</div>
                    <div className="font-bold text-black">${emp.salary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
