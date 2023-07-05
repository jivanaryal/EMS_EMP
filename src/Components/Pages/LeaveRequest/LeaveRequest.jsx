import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
// import axios from "axios";
import { post } from "../../../services/api";
// import axios from "axios";

// const schema = yup.object().shape({
//   dept_name: yup
//     .string()
//     .required("The Name is required")
//     .max(15, "Character length should not exceed 15")
//     .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
//   dept_location: yup
//     .string()
//     .required("The location is required")
//     .max(15, "Character length should not exceed 15")
//     .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
// });
const FormField = [
  {
    name: "start_date",
    type: "Date",
  },
  {
    name: "end_date",
    type: "Date",
  },
  {
    name: "Leave Details",
    type: "textarea",
  },
];

const LeaveRequest = () => {
  const storedUserId = localStorage.getItem("emp_id");
  const postFormData = async (value) => {
    post(`/leave/request/${storedUserId}`, value).then((res) => {
      toast.success("the request is send");
    });
  };
  return (
    <div className="w-full px-6 sm:px-10">
      <Formik
        initialValues={{
          start_date: "",
          end_date: "",
          message: "",
        }}
        // validationSchema={schema}
        onSubmit={(values) => {
          postFormData(values);
          // toast.success("Form submitted successfully!");
        }}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="mt-8 shadow-sm shadow-gray-400 p-8"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {FormField.map((field, index) => (
                <div key={index} className="text-gray-600">
                  <label htmlFor={field.name} className="text-sm font-semibold">
                    {field.name}
                  </label>
                  <Field
                    type={field.type}
                    name={field.name}
                    className="border border-gray-400 rounded-md py-2 px-3 w-full"
                    placeholder={`Enter ${field.name}`}
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-9">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Add Leave
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default LeaveRequest;
