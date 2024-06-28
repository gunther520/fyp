import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import userSignUpSchema from "./schema";
import CustomInputField from "../base/InputFiled/CustomInputField";
import CustomButton from "../base/Button/CustomButton";
import WEB_ROUTE_PATHS from "../../utils/constants/WebRoute";
import { useMutation } from "react-query";
import signup from "../../services/users/signup";

const SignupPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: signUpUser } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      navigate(`${WEB_ROUTE_PATHS.login}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    console.log(data);
    await signUpUser(data);
  };

  return (
    <div className="bg-gray-light">
      <div className="flex items-center justify-center min-h-screen">
        <Formik
          initialValues={{ email: "", password: "", confirmedPassword: "" }}
          validationSchema={userSignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, touched }) => (
            <Form className="w-4/5 md:w-2/3 lg:w-2/5 bg-gray-100 p-8 rounded shadow-lg space-y-5">
              <ChevronLeftIcon
                onClick={() => navigate(`${WEB_ROUTE_PATHS.home}`)}
                className="size-7 opacity-50 hover:opacity-100 hover:cursor-pointer"
              />

              <div className="w-full text-center">
                <span className="text-2xl font-bold">New User</span>
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
                  isError={errors.email ? true : false}
                  isTouched={touched.email}
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
                  isError={errors.password ? true : false}
                  isTouched={touched.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-warning-red-heavy text-sm font-semibold my-1"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmedPassword"
                  className="block text-sm font-semibold"
                >
                  Confirmed Password:
                </label>
                <CustomInputField
                  type="password"
                  name="confirmedPassword"
                  id="confirmedPassword"
                  placeholder="Enter Confirmed Password"
                  style={`${
                    errors.confirmedPassword && touched.confirmedPassword
                      ? "error"
                      : "no-error"
                  }`}
                  isError={errors.confirmedPassword ? true : false}
                  isTouched={touched.confirmedPassword}
                />
                <ErrorMessage
                  name="confirmedPassword"
                  component="div"
                  className="text-warning-red-heavy text-sm font-semibold my-1"
                />
              </div>

              <CustomButton
                type="submit"
                disabled={isSubmitting}
                style="wide-btn"
                varient="login-submit-btn"
                text="Sign Up"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
