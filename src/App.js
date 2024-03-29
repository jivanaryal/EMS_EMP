import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import Leave from "./Components/Pages/LeaveRequest/Leave";
import EditLeaveRequest from "./Components/Pages/LeaveRequest/EditLeaveRequest";
import Profile from "./Components/Navigation/Navbar/Profile/Profile";
import Task from "./Components/Pages/Task/Task";
import NewTask from "./Components/Pages/Task/NewTask/NewTask";
import InProgressTask from "./Components/Pages/Task/Inprogresstask/InProgressTask";
import CompletedTask from "./Components/Pages/Task/completedtask/CompletedTask";
// import UpdateTask from "./Components/Pages/Task/NewTask/UpdateTask";
import Check1 from "./dummy/Check1";
import TaskDetails from "./Components/Pages/Task/NewTask/TaskDetails";
import InputField from "./dummy/InputField";
import LeaveApprovalList from "./Components/Pages/LeaveRequest/LeaveHistory";
import ChangePassword from "./Components/Pages/LoginPage/ChangePassword";
import NoRouteFound from "./Components/Pages/Notfound/NoRouteFound";
import MyProfile from "./Components/Navigation/Navbar/Profile/MyProfile";
import TaskReport from "./Components/Pages/Task/NewTask/TaskReport";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leave/edit/:id" element={<EditLeaveRequest />} />
            <Route path="leave/history" element={<LeaveApprovalList />} />
            {/* <Route path="myprofile" element={<Profile />} /> */}
            <Route path="task" element={<Task />} />
            <Route path="task/new" element={<NewTask />} />
            <Route path="/view/:id" element={<TaskDetails />} />
            {/* <Route path="/UpdateTask" element={<UpdateTask />} /> */}
            <Route path="task/inprogress" element={<InProgressTask />} />
            <Route path="task/completed" element={<CompletedTask />} />
            <Route path="task/history/:id" element={<TaskReport />} />
            {/* <Route path="jivan" element={<Check1 />} /> */}
            {/* <Route path="manoj" element={<InputField />} /> */}
            <Route path="/setting" element={<ChangePassword />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoRouteFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
