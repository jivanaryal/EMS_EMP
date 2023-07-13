import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";

const Index = ({ name, onClick, falseCondition }) => {
  const success = () => {
    console.log("success");
    onClick();
    falseCondition();
  };

  const fail = () => {
    falseCondition();
  };

  const FormField = [
    {
      name: "Remarks",
      type: "text",
    },
    {
      name: "work completion (%)",
      type: "text",
    },
    {
      name: "status",
      type: "text",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={fail}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-md dark:bg-gray-700 ">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={fail}
        ></button>
        <div className="w-full px-6 sm:px-10">
          <Formik
            initialValues={{
              dept_name: "",
              dept_location: "",
            }}
            // validationSchema={schema}
            onSubmit={(values) => {
              console.log(values);
              // toast.success("Form submitted successfully!");
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-8 ">
                <div className="nav font-extrabold text-xl border-gray-300 p-2 text-black ">
                  Task Action
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                  {FormField.map((field, index) => (
                    <div key={index} className="">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-semibold text-white"
                      >
                        {field.name}
                      </label>
                      <Field
                        type={field.type}
                        name={field.name}
                        className="border border-gray-400 rounded-md py-2 px-3 w-full flex"
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
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 mb-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </div>
  );
};

export default Index;
