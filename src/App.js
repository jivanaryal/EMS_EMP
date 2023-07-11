import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import Leave from "./Components/Pages/LeaveRequest/Leave";
import Profile from "./Components/Navigation/Navbar/Profile/Profile";
import Task from "./Components/Pages/Task/Task";
import NewTask from "./Components/Pages/Task/NewTask/NewTask";
import InProgressTask from "./Components/Pages/Task/InProgressTask";
import CompletedTask from "./Components/Pages/Task/CompletedTask";
import TaskDetails from "./Components/Pages/Task/NewTask/TaskDetails";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leave" element={<Leave />} />
            <Route path="myprofile" element={<Profile />} />
            <Route path="task" element={<Task />} />
            <Route path="task/new" element={<NewTask />} />
            <Route path="/view" element={<TaskDetails />} />
            <Route path="task/inprogress" element={<InProgressTask />} />
            <Route path="task/completed" element={<CompletedTask />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
