import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import userSignUpSchema from "./schema";
import CustomInputField from "../base/InputFiled/CustomInputField";
import CustomButton from "../base/Button/CustomButton";
import WEB_ROUTE_PATHS from "../../utils/constants/WebRoute";
import { useMutation } from "react-query";
import axios from "axios";
import sendEmailVerificationCode from "../../services/users/sendEmailVerificationCode";
import {
  displaySuccessToast,
  displayErrorToast,
} from "../base/Toast/CustomToast";
import { ErrorMessages, SuccessMessages } from "../../utils/constants/Message";

const SignupPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: sendCode } = useMutation({
    mutationFn: sendEmailVerificationCode,
    onSuccess: (data) => {
      displaySuccessToast(
        `${SuccessMessages.SEND_VERIFICATION_CODE_SUCCESS} to your email`
      );
      navigate(WEB_ROUTE_PATHS.emailVerification, {
        state: { email: data.data.email, password: data.data.password },
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(
          err.response?.data?.message ?? ErrorMessages.UNEXPECTED_ERROR
        );
        return;
      }
    },
  });

  const handleSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await sendCode(data);
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
    }
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
                onClick={() => navigate(`${WEB_ROUTE_PATHS.login}`)}
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
                style={isSubmitting ? "disabled-wide-btn" : "wide-btn"}
                varient="sign-up-submit-btn"
                text="Sign Up"
                loading={isSubmitting}
                spinner={true}
                spinnerSize="4"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
