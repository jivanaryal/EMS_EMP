import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import Leave from "./Components/Pages/LeaveRequest/Leave";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leave" element={<Leave />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
