import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

const UserAuthContextApi = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("emp_id");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []); // empty dependency array to run effect only once on mount

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
