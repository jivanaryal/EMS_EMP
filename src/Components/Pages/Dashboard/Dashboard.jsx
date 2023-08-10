import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { get } from "../../../services/api";

const Dashboard = () => {
  const [singleEmployee, setSingleEmployee] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [task, setTask] = useState([]);
  // const [newTask, setNewTask] = useState([]);
  const storedUserId = localStorage.getItem("emp_id");

  useEffect(() => {
    get(`/leave/approve/${storedUserId}`)
      .then((res) => {
        if (res.status === 200) {
          setEmployee(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    get(`/employee/${storedUserId}`)
      .then((res) => {
        setSingleEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    get(`/task/${storedUserId}`)
      .then((res) => {
        setTask(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(task, "taskkkkkkkkkkkkkkkk");

    // const pending = task.filter((val) => val.status === "pending").length;
    // const inprogress = task.filter((val) => val.status === "inprogress").length;
    // const completed = task.filter((val) => val.status === "completed").length;
    // console.log(completed);
    // setNewData([pending, inprogress, completed]);
    // data.push(newData);
    // console.log(data);
  }, []);

  const pending = task.filter((val) => val.status === "pending").length;
  const inprogress = task.filter((val) => val.status === "inprogress").length;
  const completed = task.filter((val) => val.status === "completed").length;

  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.clear();
    navigate("/login");
  };
  const data = [
    {
      title: "Take Leave Request",
      intro: "View Leave",
      colors: "#FFEFE7",
      colors1: "#EC9E09",
      path: "/leave",
      icons: <HiBuildingOffice2 />,
    },
    {
      title: `View ${pending} New Task`,
      // num: "24",
      intro: "View Employee",
      colors: "#E8F0FB",
      colors1: "#595FF0",
      path: "/task/new",
      icons: <HiUserGroup />,
    },
    {
      title: `View ${inprogress} Inprogress Task`,
      // num: "24",
      intro: "Assign Task",
      colors: "#FDEBF9",
      colors1: "#16C6BC",
      path: "/task/inprogress",
      icons: <IoMdExit />,
    },
    {
      title: ` View ${completed} Completed Task`,
      // num: "24",
      intro: "View Leave Request",
      colors: "#F1F9FB",
      colors1: "#F74E61",
      path: "/task/completed",
      icons: <BiTask />,
    },
  ];

  return (
    <UserAuthContextApi>
      <UserAuthContext.Provider>
        <div className="container mx-auto py-10">
          <div className="">
            <div className=" rounded-lg p-8 ">
              <div className="grid grid-cols-2 w-8/12  md:gap-8 gap-6 ">
                {data.map((val) => (
                  <Link to={val.path} key={val.id}>
                    <div
                      style={{ backgroundColor: val.colors1 }}
                      className="rounded-lg flex py-10 md:h-full h-28  md:w-full  flex-col justify-center items-center text-white text-center p-4 shadow-md transform transition-all hover:scale-105"
                    >
                      <div className="lg:text-4xl md:text-xl text-lg font-bold rounded-md p-4 ">
                        {val.icons}
                      </div>
                      <div className="lg:text-xl md:text-base text-xs  font-bold mb-2 font-link ">
                        {val.title}
                      </div>

                      <div className="text-2xl">{val.num}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
