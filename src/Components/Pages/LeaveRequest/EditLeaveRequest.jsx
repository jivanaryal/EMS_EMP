import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";

import { post, update } from "../../../services/api";
import { useLocation, useParams } from "react-router-dom";

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
  const location = useLocation();
  const { id } = useParams();

  console.log(location.state);

  const postFormData = async (value) => {
    update(`/leave/approve/emp/${id}`, value)
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
    <div className="w-full px-6 sm:px-10 mt-20">
      <Formik
        initialValues={{
          start_date: location.state.start_date,
          end_date: location.state.end_date,
          message: location.state.message,
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
                Update Leave
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
