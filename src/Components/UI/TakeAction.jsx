import { Formik } from "formik";
import React from "react";

const TakeAction = () => {
  return (
    <div className="shadow-sm shadow-gray-400">
      <div className="border-2 border-red-400 grid grid-cols-2">
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
        ></Formik>{" "}
      </div>
    </div>
  );
};

export default TakeAction;
