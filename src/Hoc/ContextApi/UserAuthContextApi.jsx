import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

const UserAuthContextApi = ({ children }) => {
  const [Token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [localStorage]);
  return (
    <UserAuthContext.Provider
      value={{
        name: "jivan",
        tkn: localStorage.getItem("token"),
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextApi;
