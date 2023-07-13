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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={fail}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-md dark:bg-gray-200 ">
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
                <div className="shadow-sm shadow-gray-400 w-96 border-2 border-gray-300 ">
                  <div className="grid grid-cols-2 border-b-2 border-gray-300 hover:bg-green-400">
                    <label
                      htmlFor="remarks"
                      className="text-lg font-semibold text-black border-r-2 border-gray-300 pl-2"
                    >
                      Remarks
                    </label>
                    <div className="textarea m-2">
                      <textarea
                        className="w-full h-44 px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
                        style={{ paddingTop: "0.5rem" }}
                        placeholder="Write your description or message here..."
                      />
                    </div>
                  </div>
                  {/* work percentage */}
                  <div className="grid grid-cols-2 items-center border-b-2 border-gray-300 hover:bg-green-400">
                    <div className="py-4 border-gray-300 border-r-2 ">
                      <label htmlFor="work" className="border-gray-300 pl-2">
                        Work Completion (In %)
                      </label>
                    </div>
                    <div className="m-2">
                      <Field
                        type="text"
                        placeholder="dfdfd"
                        className="border border-gray-400 rounded-md px-2 py-2 w-full"
                      />
                    </div>
                  </div>
                  {/* status */}
                  <div className="grid grid-cols-2 items-center hover:bg-green-400">
                    <div className="border-r-2  border-gray-300 py-4">
                      <label htmlFor="work" className=" pl-2">
                        Status
                      </label>
                    </div>
                    <div className="m-2">
                      <Field
                        type="text"
                        placeholder="dfdfd"
                        className="border border-gray-400 p-2 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-9">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 mb-3"
                  >
                    Update
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
