import React from "react";

const InputField = ({ value, onChange }) => {
  return (
    <textarea
      className="w-1/6 h-72 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
      style={{ paddingTop: "0.5rem" }}
      value={value}
      onChange={onChange}
      placeholder="Write your description or message here..."
    />
  );
};

export default InputField;
