import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";

import { useNavigate } from "react-router-dom";
import { post } from "../../../services/api";

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
      post("/createemp/login", val).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          const emp_id = res.data.emp_id;
          console.log(res.data);
          localStorage.setItem("emp_id", emp_id);
          navigate("/", { state: { emp_id } });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-400 ">
      <div className="bg-[#ffffff] rounded-lg w-96 p-8 h-96  shadow-lg shadow-blue-300">
        <h2 className="text-4xl font-bold mb-6 text-center ">Log in</h2>
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
                                  className="block font-bold mb-2 text-gray-700"
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

                          <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                          >
                            Log in
                          </button>
                          <button
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500 text-white font-bold ml-5 py-2 px-4 rounded-lg hover:bg-blue-700"
                          >
                            Signup
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
