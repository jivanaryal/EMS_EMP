import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { update } from "../../services/api";
import { useNavigate } from "react-router";

const FormFields = [
  {
    name: "dept_name",
    name1: "department",
    type: "select",
    options: [],
  },
  {
    name: "first_name",
    type: "text",
  },
  {
    name: "middle_name",
    type: "text",
  },
  {
    name: "last_name",
    type: "text",
  },
  {
    name: "salary",
    type: "text",
  },
  {
    name: "position",
    type: "text",
  },
  {
    name: "gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ],
  },
  {
    name: "image",
    type: "file",
  },
];

const Index = ({ onClick, falseCondition, employee }) => {
  const id = localStorage.getItem("emp_id");
  const [first, setFirst] = useState("");
  const [newImg, setNewImg] = useState("");
  const navigate = useNavigate();

  const success = () => {
    onClick();
    falseCondition();
  };

  const fail = () => {
    falseCondition();
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    setFirst(e.target.files);
    setNewImg(e.target.files[0]);
  };

  const postFormData = (val) => {
    const formData = new FormData();

    formData.append("dept_id", employee[0].dept_id);
    formData.append("dept_name", val.dept_name);
    formData.append("position", val.position);
    formData.append("salary", val.salary);
    formData.append("first_name", val.first_name);
    formData.append("middle_name", val.middle_name);
    formData.append("last_name", val.last_name);
    formData.append("gender", val.gender);
    formData.append("file", first[0]);
    console.log(first[0]);

    try {
      update(`/employee/${id}`, formData)
        .then((res) => {
          console.log("hello");
          if (res.status === 200) {
            toast.success("The employee data is updated");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("hello");
      console.log(error);
    }
  };

  const initialValues = {
    dept_name: employee[0]?.dept_name || "",
    position: employee[0]?.position || "",
    salary: employee[0]?.salary || "",
    first_name: employee[0]?.first_name || "",
    middle_name: employee[0]?.middle_name || "",
    last_name: employee[0]?.last_name || "",
    image: employee[0]?.image || "",
    gender: employee[0]?.gender || "",
  };

  FormFields[0].options = [...employee];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={fail}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-md dark:bg-white ">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={fail}
        ></button>
        <div>
          <div className="pt-5 w-10/12 mx-auto">
            <Formik
              initialValues={initialValues}
              onSubmit={(val) => {
                console.log(val);
                postFormData(val);
              }}
            >
              {({ handleSubmit, values }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className=" grid grid-cols-2 gap-6">
                      {FormFields.map((val, i) => {
                        if (
                          val.name === "dept_name" ||
                          val.name === "salary" ||
                          val.name === "position"
                        ) {
                          return (
                            <div key={i}>
                              <label
                                htmlFor={val.name}
                                className="block font-bold mb-2"
                              >
                                {val.name}
                              </label>
                              <div className="border border-gray-400 p-2 rounded w-full bg-gray-100">
                                {initialValues[val.name]}
                              </div>
                            </div>
                          );
                        } else if (val.type === "select") {
                          return (
                            <div>
                              <label htmlFor={val.name} className="font-bold">
                                {val.name}
                              </label>
                              <br />
                              <Field
                                as={val.type}
                                placeholder={`enter ${val.name}`}
                                name={val.name}
                                className="border border-gray-400 p-2 rounded h-12 w-full"
                              >
                                <option value="" selected disabled>
                                  {`select ${val.name}`}
                                </option>
                                {val.options?.map((option, j) => {
                                  if (val.name === "dept_name") {
                                    return (
                                      <option
                                        key={j}
                                        value={option.dept_name}
                                        data-dept-id={option.dept_id}
                                      >
                                        {option.dept_name}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option value={option.value} key={j}>
                                        {option.label}
                                      </option>
                                    );
                                  }
                                })}
                              </Field>
                            </div>
                          );
                        } else if (val.type === "file") {
                          return (
                            <div>
                              <label
                                htmlFor={val.type}
                                className="block font-bold"
                              >
                                {val.name}
                              </label>
                              <br />
                              <div className="flex">
                                <input
                                  type={val.type}
                                  name={val.name}
                                  accept=".png,.jpg,.jpeg,.gif"
                                  multiple
                                  onChange={(e) => handleChange(e)}
                                />
                                <img
                                  src={
                                    newImg
                                      ? URL.createObjectURL(newImg)
                                      : `http://localhost:5000/${
                                          employee[0]?.image || " "
                                        }`
                                  }
                                  className="w-44 h-44 rounded-xl border-2 bg-black px-2 border-black py-2 shadow-mainColor shadow-lg relative right-14 bottom-14"
                                  alt="preview"
                                />
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={i}>
                              <label
                                htmlFor={val.name}
                                className="block font-bold mb-2"
                              >
                                {val.name}
                              </label>
                              <Field
                                type={val.type}
                                placeholder={`enter ${val.name}`}
                                name={val.name}
                                className="border border-gray-400 p-2 rounded w-full"
                              />
                              <ErrorMessage
                                name={val.name}
                                component={"div"}
                                className="text-red-600"
                              />
                            </div>
                          );
                        }
                      })}
                      <ToastContainer className="mt-11 text-sm " />
                    </div>

                    <button
                      type="submit"
                      className="bg-mainColor mb-5 relative bottom-16  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => falseCondition(true)}
                      className="bg-red-500 ml-5 mb-5 relative bottom-16   text-white font-bold py-2 px-4  rounded"
                    >
                      Cancel
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
