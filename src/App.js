import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import LeaveRequest from "./Components/Pages/LeaveRequest/LeaveRequest.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leave" element={<LeaveRequest />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
