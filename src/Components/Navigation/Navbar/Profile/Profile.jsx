import React from "react";
import { Link, useLocation } from "react-router-dom";
const data = [
  {
    name: "My Profile",
    path: "/myprofile",
  },
  {
    name: "Setting",
    path: "/setting",
  },
  {
    name: "Logout",
    path: "/logout",
  },
];

const Profile = () => {
  const location = useLocation();
  return (
    <div>
      {data.map((val, i) => {
        return (
          <Link to={val.path} key={i}>
            <div
              className={`text-black ${
                location.pathname == val.path
              } && hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1`}
            >
              {val.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Profile;
