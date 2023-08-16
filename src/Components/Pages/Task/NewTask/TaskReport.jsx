import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { update } from "../../../../services/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  status: yup
    .string()
    .required("The Name is required")
    .max(20, "Character length should not exceed 15"),
  task_complete: yup
    .number() // Change to .number()
    .required("The task_complete is required")
    .min(0, "Task completion should not be less than 0")
    .max(100, "Task completion should not be greater than 100"),
  emp_final_remark: yup.string().required("The emp_final_remark is required"),
});

const TaskReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateStatusBasedOnTaskComplete = (value) => {
    let newStatus = "inprogress"; // Default status
    console.log(newStatus);
    const number = parseInt(value);

    if (number === 100) {
      return (newStatus = "completed");
    } else if (number < 0 || number > 100) {
      return (newStatus = "invalid_percentage");
    }
    console.log(newStatus);
    return newStatus;
  };

  const postFormData = async (val) => {
    const data = {
      emp_final_remark: val.emp_final_remark,
      task_complete: val.task_complete,
      status: val.status,
      issues: val.issues,
      resources: val.resources,
    };

    if (val.status === "invalid_percentage") {
      // Don't submit if status is "invalid_percentage"
      toast.error("Invalid percentage. Form data not submitted.");
    } else {
      update(`/task/emp/${id}`, data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("The task remarks is posted");
            setTimeout(() => {
              navigate(-1);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-center text-3xl mt-4 pl-4">
          Task Report
        </h1>
        <Formik
          initialValues={{
            emp_final_remark: "",
            task_complete: "",
            status: "",
            issues: "",
            resources: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            values.status = updateStatusBasedOnTaskComplete(
              values.task_complete
            );
            postFormData(values);
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              className="m-6 border-2 border-gray-300 shadow-sm shadow-gray-300"
            >
              <div className="grid grid-cols-4 border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                <label
                  htmlFor="remarks"
                  className="col-span-1 text-lg font-semibold border-r-2 border-gray-300 pl-2 hover:text-white"
                >
                  Remarks
                </label>
                <div className="textarea col-span-3 m-2">
                  <Field
                    as="textarea"
                    name="emp_final_remark"
                    className="w-full h-32 px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300 text-black"
                    style={{ paddingTop: "0.5rem" }}
                    placeholder="Remarks..."
                  />
                  <ErrorMessage
                    name="emp_final_remark"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Issues and RoadBacks */}
              <div className="grid grid-cols-4 border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                <label
                  htmlFor="remarks"
                  className="col-span-1 text-lg font-semibold border-r-2 border-gray-300 pl-2 hover:text-white"
                >
                  Issues and RoadBacks
                </label>
                <div className="textarea col-span-3 m-2">
                  <Field
                    as="textarea"
                    name="issues"
                    className="w-full h-20 px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300 text-black"
                    style={{ paddingTop: "0.5rem" }}
                    placeholder="issues..."
                  />
                  <ErrorMessage
                    name="issues"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Resources Used */}
              <div className="grid grid-cols-4 items-center border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                <div className="col-span-1 py-4 border-gray-300 border-r-2">
                  <label htmlFor="work" className="border-gray-300 pl-2">
                    Resources Used
                  </label>
                </div>
                <div className="col-span-3 m-2">
                  <Field
                    type="text"
                    name="resources"
                    placeholder="Used resources....."
                    className="border border-gray-400 rounded-md px-2 py-2 w-full text-black"
                  />
                  <ErrorMessage
                    name="resources"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Work Completion (In %) */}
              <div className="grid grid-cols-4 items-center border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                <div className="col-span-1 py-4 border-gray-300 border-r-2">
                  <label htmlFor="work" className="border-gray-300 pl-2">
                    Work Completion (In %)
                  </label>
                </div>
                <div className="col-span-3 m-2">
                  <Field
                    type="number" // Change to type="number"
                    name="task_complete"
                    placeholder="Work completion percentage"
                    className="border border-gray-400 rounded-md px-2 py-2 w-full text-black"
                    onBlur={(e) => {
                      const newStatus = updateStatusBasedOnTaskComplete(
                        e.target.value
                      );
                      setFieldValue("status", newStatus, true);
                    }}
                  />
                  <ErrorMessage
                    name="task_complete"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Status */}
              <div className="grid grid-cols-4 items-center border-b-2 border-gray-300 hover:bg-mainColor hover:text-white">
                <div className="col-span-1 border-r-2 border-gray-300 py-4">
                  <label htmlFor="work" className="pl-2">
                    Status
                  </label>
                </div>
                <div className="col-span-3 m-2">
                  <Field
                    as="select"
                    name="status"
                    className="border border-gray-400 p-2 w-full rounded-lg text-black"
                    disabled
                    // disabled={values.status === "invalid_percentage"} // Disable if status is "invalid_percentage"
                  >
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="invalid_percentage">
                      Invalid Percentage
                    </option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center mt-9 gap-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 mb-3"
                  // onClick={UpdateTask}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer className="mt-11 text-sm" />
      </div>
    </div>
  );
};

export default TaskReport;
