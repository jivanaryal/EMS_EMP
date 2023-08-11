import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DangerModal from "../../../UI/DangerModal";
import { get } from "../../../../services/api";

const data = [
  {
    name: "Profile",
    path: "/myprofile",
  },
  {
    name: "Setting",
    path: "/setting",
  },
];

const Profile = () => {
  const [showDelete, setShowDelete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const id = localStorage.getItem("emp_id");

  const resetData = () => {
    localStorage.clear();
    navigate("/login");
  };
  // Function to execute delete operation after confirmation
  const success = () => {
    setShowDelete(true);
  };

  // Function to cancel the delete operation
  const failure = () => {
    setShowDelete(false);
  };
  useEffect(() => {
    get(`/employee/${id}`).then((res) => {
      setEmployee(res.data);
    });
  }, []);

  return (
    <div>
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="department"
          employee={employee}
        />
      )}

      <div
        className={`text-black ${
          location.pathname === "/myprofile"
        } && hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1`}
        onClick={() => {
          setShowDelete(true);
        }}
      >
        Update Profile
      </div>

      <Link to="/setting">
        <div
          className={`text-black ${
            location.pathname === "/setting"
          } && hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1`}
        >
          change password
        </div>
      </Link>
      <div
        onClick={resetData}
        className="hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1"
      >
        Logout
      </div>
    </div>
  );
};

export default Profile;
