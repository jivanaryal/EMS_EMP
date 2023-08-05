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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-lg p-8 shadow-md"
              style={{
                background:
                  "linear-gradient(to right, #f9f8ff, #f7f9fc, #fcfbf7, #f8f7f9, #f9f8ff)",
              }}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {data.map((val) => (
                  <Link to={val.path} key={val.id}>
                    <div
                      style={{ backgroundColor: val.colors1 }}
                      className="rounded-lg flex md:h-52 h-32 flex-col justify-center items-center text-white text-center p-4 shadow-md transform transition-all hover:scale-105"
                    >
                      <div className="lg:text-4xl md:text-xl text-lg font-bold rounded-md p-4 ">
                        {val.icons}
                      </div>
                      <div className="lg:text-xl md:text-lg text-base font-bold mb-2 font-link ">
                        {val.title}
                      </div>

                      <div className="text-2xl">{val.num}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              {singleEmployee.map((val) => (
                <div
                  key={val.id}
                  className="bg-white capitalize rounded-lg p-8 shadow-md"
                >
                  <div className="text-center mb-4">
                    <img
                      src={`http://localhost:5000/${val.image}`}
                      alt=""
                      className="w-40 h-40 rounded-full md:block hidden object-cover border-4 border-blue-500 shadow-lg mx-auto"
                    />
                  </div>
                  <h1 className="text-4xl font-bold mb-4 text-blue-500 text-center">
                    My Details
                  </h1>
                  <div className="text-lg mb-2">
                    <span className="font-semibold text-gray-600">Name:</span>{" "}
                    {val.first_name} {val.middle_name} {val.last_name}
                  </div>
                  <div className="text-lg mb-2">
                    <span className="font-semibold text-gray-600">
                      Department:
                    </span>{" "}
                    {val.dept_name}
                  </div>
                  <div className="text-lg mb-2">
                    <span className="font-semibold text-gray-600">Gender:</span>{" "}
                    {val.gender}
                  </div>
                  <div className="text-lg">
                    <span className="font-semibold text-gray-600">Salary:</span>{" "}
                    ${val.salary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
