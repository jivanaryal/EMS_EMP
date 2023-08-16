import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

export const UserAuthContext = createContext();

const UserAuthContextApi = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const location = useLocation().pathname;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      if (location === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <UserAuthContext.Provider
      value={{
        userId,
        setUserId,
        name: "jivan",
        tkn: token || "", // provide a default value when localStorage is not available
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextApi;
