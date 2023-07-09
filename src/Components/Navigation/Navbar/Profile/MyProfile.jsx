import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
// import { get, patch } from "../../../services/api";
const FormFields = [
  {
    name: "dept_name",
    name1: "department",
    type: "text",
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
    name: "job",
    type: "text",
  },

  {
    name: "gender",
    name1: "gender",
    type: "text",
  },
  {
    name: "image",
    type: "file",
  },
];
const MyProfile = () => {
  const [employee, setEmployee] = useState([]);
  const [first, setFirst] = useState("");

  FormFields[0].options = [...employee];
  return (
    <div>
      <div className="mt-20 px-20">
        <Formik
          initialValues={{
            dept_name: "",
            job: "",
            salary: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            image: [],
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  {FormFields.map((val, i) => {
                    if (val.type === "select") {
                      return (
                        <div key={i}>
                          <label
                            htmlFor={val.name}
                            className="block font-bold mb-2"
                          >
                            {val.name}
                          </label>
                          <Field
                            as={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-2 rounded w-full"
                          >
                            <option value="" selected disabled>
                              {`select ${val.name1}`}
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
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    } else if (val.type === "file") {
                      return (
                        <div>
                          <label htmlFor={val.type} className="block font-bold">
                            {val.name}
                          </label>
                          <br />
                          <div className="flex">
                            <input
                              type={val.type}
                              name={val.name}
                              accept=".png,.jpg,.jpeg,.gif"
                              required
                              multiple
                            />
                            <div className=" ">
                              <img
                                src={
                                  first
                                    ? URL.createObjectURL(first)
                                    : "https://cdn-icons-png.flaticon.com/512/1869/1869679.png"
                                }
                                className="w-44 h-44 rounded-xl border-2 bg-black px-2 border-black py-2 shadow-mainColor shadow-lg relative right-14 bottom-14"
                                alt="preview"
                              />
                            </div>
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
                  <ToastContainer position="bottom-right" />
                </div>

                <button
                  type="submit"
                  className="bg-mainColor mb-5 relative bottom-24  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default MyProfile;
