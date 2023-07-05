import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";
import { get } from "../../../services/api";
// import LeaveChart from "./LeaveChart";

const Dashboard = () => {
  const [singleEmployee, setSingleEmployee] = useState([]);
  const storedUserId = localStorage.getItem("emp_id");

  useEffect(() => {
    console.log("hello");
    get(`/employee/${storedUserId}`)
      .then((res) => {
        console.log(res.data);
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
        <div>profile</div>
        <div>
          {singleEmployee.map((val, i) => {
            return (
              <div key={i}>
                <div>{val.salary}</div>
                <p>{val.emp_id}</p>
              </div>
            );
          })}
        </div>
        <div>
          <button onClick={removeToken}>logout</button>
        </div>
        <div>{/* <LeaveChart /> */}</div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
