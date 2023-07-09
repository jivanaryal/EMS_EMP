import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import Leave from "./Components/Pages/LeaveRequest/Leave";
import Task from "./Components/Pages/Task/Task";
import NewTask from "./Components/Pages/Task/NewTask";
import InProgressTask from "./Components/Pages/Task/InProgressTask";
import CompletedTask from "./Components/Pages/Task/CompletedTask";
import MyProfile from "./Components/Navigation/Navbar/Profile/MyProfile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leave" element={<Leave />} />
            <Route path="task" element={<Task />} />
            <Route path="task/new" element={<NewTask />} />
            <Route path="task/inprogress" element={<InProgressTask />} />
            <Route path="task/completed" element={<CompletedTask />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
