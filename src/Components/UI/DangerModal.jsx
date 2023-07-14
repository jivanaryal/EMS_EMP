import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { update } from "../../services/api";
import { useParams } from "react-router-dom";

const Index = ({ name, onClick, falseCondition, task }) => {
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

  console.log(task);

  const postFormData = async (val) => {
    console.log(task[0]);
    console.log(val);

    const data = {
      emp_final_remark: val.emp_final_remark,
      task_complete: val.task_complete,
      status: val.status,
      emp_name: task[0].emp_name,
      task_assign_date: task[0].task_assign_date,
      task_end_date: task[0].task_end_date,
      task_priority: task[0].task_priority,
      task_description: task[0].task_description,
      task_title: task[0].task_title,
      emp_id: task[0].emp_id,
    };

    update(`/task/${id}`, data)
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
      <div className="relative z-10 bg-white rounded-lg shadow-md dark:bg-white ">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={fail}
        ></button>
        <div className="w-full px-4">
          <h1 className="font-bold text-xl mt-4 pl-4">Take Action</h1>
          <Formik
            initialValues={{
              emp_final_remark: "",
              task_complete: "",
              status: "",
            }}
            onSubmit={(values) => {
              postFormData(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="m-6 border-2 border-gray-300 shadow-sm shadow-gray-300"
              >
                {/* ... Remarks*/}
                <div className="grid grid-cols-2 border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                  <label
                    htmlFor="remarks"
                    className="text-lg font-semibold border-r-2 border-gray-300 pl-2 hover:text-white"
                  >
                    Remarks
                  </label>
                  <div className="textarea m-2">
                    <Field
                      as="textarea"
                      name="emp_final_remark"
                      className="w-full h-44 px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300 text-black"
                      style={{ paddingTop: "0.5rem" }}
                      placeholder="Remarks..."
                    />
                  </div>
                </div>
                {/* ...work completion in percentage */}
                <div className="grid grid-cols-2 items-center border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                  <div className="py-4 border-gray-300 border-r-2">
                    <label htmlFor="work" className="border-gray-300 pl-2">
                      Work Completion (In %)
                    </label>
                  </div>
                  <div className="m-2">
                    <Field
                      type="text"
                      name="task_complete"
                      placeholder="Work completion percentage"
                      className="border border-gray-400 rounded-md px-2 py-2 w-full text-black"
                    />
                  </div>
                </div>
                {/* ... ststuss*/}
                <div className="grid grid-cols-2 items-center border-b-2 border-gray-300 hover:bg-mainColor">
                  <div className="border-r-2 border-gray-300 py-4 hover:text-white">
                    <label htmlFor="work" className="pl-2">
                      Status
                    </label>
                  </div>
                  <div className="m-2">
                    <Field
                      as="select"
                      name="status"
                      className="border border-gray-400 p-2 w-full rounded-lg"
                    >
                      <option value="">Select Status</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Field>
                  </div>
                </div>
                <div className="flex justify-center mt-9 gap-6">
                  <div
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md transition-colors duration-300 mb-3 cursor-pointer hover:bg-red-500"
                    onClick={fail}
                  >
                    Cancel
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 mb-3"
                    // onClick={UpdateTask}
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
