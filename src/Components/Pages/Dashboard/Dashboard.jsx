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
    get(`/leave/approve/${storedUserId}`).then((res) => {
      if (res.status === 200) {
        setEmployee(res.data);
      }
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
        <div className="grid grid-cols-2 gap-24">
          <div>
            {singleEmployee.map((val, i) => (
              <div className="w-11/12 bg-white capitalize rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
                <div className="mb-4">
                  <span className="text-gray-500 font-semibold">Image:</span>{" "}
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    alt=""
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 font-semibold">Name:</span>{" "}
                  {val.first_name} {val.middle_name} {val.last_name}
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 font-semibold">
                    Department:
                  </span>{" "}
                  {val.dept_name}
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 font-semibold">Gender:</span>{" "}
                  {val.gender}
                </div>
              </div>
            ))}
          </div>
          <div className="w-96">
            <PieChart employee={employee} />
          </div>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
