import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";

const Dashboard = () => {
  const storedUserId = localStorage.getItem("emp_id");
  console.log(storedUserId);

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
          <button onClick={removeToken}>logout</button>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
