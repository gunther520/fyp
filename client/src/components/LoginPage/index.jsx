import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import userLoginSchema from "./schema";
import CustomInputField from "../base/InputFiled/CustomInputField";
import CustomButton from "../base/Button/CustomButton";
import WEB_ROUTE_PATHS from "../../utils/constants/WebRoute";
import FontAwesomeIcons from "../base/Icons/FontAwesomeIcons";
import login from "../../services/users/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate(`${WEB_ROUTE_PATHS.home}`);
    },
    onError: (err) => {
      // toast

    },
  });
  
  const handleSubmit = async (data, { setSubmitting }) => {
    console.log("Login Submitted", data);
    setSubmitting(true);
    try{
      await loginUser(data);
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-light">
      <div className="flex items-center justify-center min-h-screen">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={userLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, touched }) => (
            <Form className="w-4/5 md:w-2/3 lg:w-2/5 bg-gray-100 p-8 rounded shadow-lg space-y-5">
              <div className="w-full text-center">
                <span className="text-2xl font-bold">Login</span>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email:
                </label>
                <CustomInputField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  style={`${
                    errors.email && touched.email ? "error" : "no-error"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-warning-red-heavy text-sm font-semibold my-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                >
                  Password:
                </label>
                <CustomInputField
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  style={`${
                    errors.password && touched.password ? "error" : "no-error"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-warning-red-heavy text-sm font-semibold my-1"
                />
              </div>

              <div className="flex flex-col item-center justify-center gap-2">
                <div className="flex justify-end">
                  <Link
                    to="/signup"
                    className="text-xs font-semibold text-blue-url hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex justify-center gap-2">
                  <span className="text-sm font-semibold">
                    Do not have an account?
                  </span>
                  <Link
                    to={`${WEB_ROUTE_PATHS.signup}`}
                    className="text-sm font-semibold text-blue-url hover:underline"
                  >
                    Sign up
                  </Link>
                </div>

                <div className="flex w-full items-center gap-2">
                  <div className="w-1/2 border border-gray-default"></div>
                  <p className="text-gray-heavy text-sm font-semibold">Or</p>
                  <div className="w-1/2 border border-gray-default"></div>
                </div>

                <div className="flex flex-row w-full justify-center gap-10">
                  <FontAwesomeIcons icon="instagram" style="text-3xl" />
                  <FontAwesomeIcons icon="facebook" style="text-3xl" />
                  <FontAwesomeIcons icon="google" style="text-3xl" />
                </div>
              </div>

              <CustomButton
                type="submit"
                disabled={isSubmitting}
                style={isSubmitting ? "disabled-wide-btn" : "wide-btn"}
                varient="login-submit-btn"
                text="Login"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
