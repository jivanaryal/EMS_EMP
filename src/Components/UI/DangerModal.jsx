import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import TakeAction from "./TakeAction";
import { update } from "../../services/api";
import { useParams } from "react-router-dom";

const Index = ({ name, onClick, falseCondition }) => {
  const { id } = useParams();
  console.log(id);
  const success = () => {
    console.log("success");
    onClick();
    falseCondition();
  };

  const fail = () => {
    falseCondition();
  };

  const postFormData = async (val) => {
    update(`/task/${id}`, val)
      .then((res) => {
        if (res.status === 200) {
          toast.success("The task remarks is posted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              emp_final_remark: "",
              task_complete: "",
              status: "",
            }}
            // validationSchema={schema}
            onSubmit={(values) => {
              postFormData(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-8 ">
                <div className="nav font-extrabold text-xl border-gray-300 p-2 text-black ">
                  Task Action
                </div>
                <div className="shadow-sm shadow-gray-400 w-96 border-2 border-red-400">
                  <div className="grid grid-cols-2 border-b-2 border-black">
                    <label
                      htmlFor="remarks"
                      className="text-lg font-semibold text-black border-r-2 border-black pl-2"
                    >
                      Remarks
                    </label>
                    <div className="textarea m-2">
                      <Field
                        as="textarea"
                        name="emp_final_remark"
                        className="w-full h-44 px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
                        style={{ paddingTop: "0.5rem" }}
                        placeholder="Write your description or message here..."
                      />
                    </div>
                  </div>
                  {/* work percentage */}
                  <div className="grid grid-cols-2 items-center border-b-2 border-black">
                    <label
                      htmlFor="work"
                      className="border-r-2 border-black pl-2"
                    >
                      Work Completion(%)
                    </label>
                    <div className="m-2">
                      <Field
                        type="text"
                        name="task_complete"
                        className="border border-gray-400 p-2 w-full rounded-lg"
                      />
                    </div>
                  </div>
                  {/* status */}
                  <div className="grid grid-cols-2 items-center">
                    <label
                      htmlFor="work"
                      className="border-r-2 border-black pl-2"
                    >
                      Status
                    </label>
                    <div className="m-2">
                      <Field
                        as="select" // Use "as" prop to render a select element
                        name="status" // Give the field a name
                        className="border border-gray-400 p-2 w-full rounded-lg"
                      >
                        <option value="">Select Status</option>

                        <option value="inprogress">In Progress</option>

                        <option value="completed">Completed</option>
                      </Field>
                    </div>
                  </div>
                </div>
                {/* <TakeAction /> */}
                <div className="flex justify-center mt-9 gap-6">
                  <div
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md transition-colors duration-300 mb-3"
                    onClick={fail}
                  >
                    Cancel
                  </div>
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
