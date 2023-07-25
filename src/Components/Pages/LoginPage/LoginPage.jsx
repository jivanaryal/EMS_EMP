import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { post } from "../../../services/api";
import bg from "../../../assests/Images/bg.png";
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

const FormField = [
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "password",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const postLoginForm = async (val) => {
    try {
      const res = await post("/createemp/login", val);

      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const emp_id = res.data.emp_id;
        console.log(res.data);
        localStorage.setItem("emp_id", emp_id);
        navigate("/", { state: { emp_id } });
      }
    } catch (error) {
      console.log(error);

      // Handle the error and display toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-400 "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-lg w-96 p-8 h-96  shadow-sm shadow-gray-300">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Employee Login
        </h2>
        <UserAuthContextApi>
          <UserAuthContext.Consumer>
            {(context) => {
              return (
                <div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={schema}
                    onSubmit={(val) => {
                      console.log(val);
                      postLoginForm(val);
                    }}
                  >
                    {({ handleSubmit }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          {FormField.map((val, i) => {
                            return (
                              <div key={i} className="mb-4">
                                <label
                                  htmlFor={val.name}
                                  className="block font-bold mb-2 text-white"
                                >
                                  {val.name}
                                </label>
                                <Field
                                  type={val.type}
                                  name={val.name}
                                  placeholder={`Enter your ${val.name}`}
                                  className="border border-gray-400 p-2 w-full rounded-lg"
                                />
                                <ErrorMessage
                                  name={val.name}
                                  component={"div"}
                                  className="text-red-500"
                                ></ErrorMessage>
                              </div>
                            );
                          })}
                          <ToastContainer />

                          <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                          >
                            Log in
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              );
            }}
          </UserAuthContext.Consumer>
        </UserAuthContextApi>
      </div>
    </div>
  );
};

export default LoginPage;
