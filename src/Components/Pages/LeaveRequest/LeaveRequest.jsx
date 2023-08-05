import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";

import { post } from "../../../services/api";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  start_date: yup.date().required("Start date is required"),
  end_date: yup.date().required("End date is required"),
  message: yup.string().required("Message is required"),
});

const FormField = [
  {
    name: "start_date",
    type: "date",
  },
  {
    name: "end_date",
    type: "date",
  },
  {
    name: "message",
    type: "text",
  },
];

const LeaveRequest = () => {
  const storedUserId = localStorage.getItem("emp_id");
  console.log(storedUserId);
  const postFormData = async (value) => {
    post(`/leave/request/${storedUserId}`, value)
      .then((res) => {
        toast.success("The request has been sent");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("You already have a pending leave request.");
        }

        // Display the full error object in the console
        console.error(error);

        // If the server sent back an error message, you can access it as follows:
        if (error.response && error.response.status === 409) {
          toast.error(error.response.data);
        }
      });
  };

  return (
    <div className="w-full ">
      <Formik
        initialValues={{
          start_date: "",
          end_date: "",
          message: "",
        }}
        validationSchema={validationSchema}
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FormField.map((field, index) => (
                <div key={index} className="text-gray-600">
                  <label htmlFor={field.name} className="text-lg font-semibold">
                    {field.name}
                  </label>
                  {field.name === "message" ? (
                    <Field
                      as="textarea" // Use a textarea element for the "message" field
                      type={field.type}
                      name={field.name}
                      className="border border-gray-400 rounded-md py-2 px-3 w-full resize-none h-32" // Customize the width and height here
                      placeholder={`Enter ${field.name}`}
                    />
                  ) : (
                    <Field
                      type={field.type}
                      name={field.name}
                      className="border border-gray-400 rounded-md py-2 px-3 w-full"
                      placeholder={`Enter ${field.name}`}
                    />
                  )}
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
      <ToastContainer className="mt-11 text-sm " />
    </div>
  );
};

export default LeaveRequest;
