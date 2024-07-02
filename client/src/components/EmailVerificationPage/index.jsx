import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CustomButton from "../base/Button/CustomButton";
import signup from "../../services/users/signup";
import verifyCode from "../../services/users/verifyCode";
import resendEmailVerificationCode from "../../services/users/resendEmailVerificationCode";
import WEB_ROUTE_PATHS from "../../utils/constants/WebRoute";
import { useMutation } from "react-query";
import axios from "axios";
import emailVerification from "./schema.js";
import CustomVerificationInputField from "../../components/base/InputFiled/CustomVerificationInputField";
import {
  displaySuccessToast,
  displayErrorToast,
} from "../base/Toast/CustomToast";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password } = location.state || {};
  const emailValidationInputRefs = useRef([]);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { mutateAsync: signupNewUser } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      displaySuccessToast("Signup Success!");
      navigate(WEB_ROUTE_PATHS.login);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(err.response?.data?.message ?? "Unexpected Error");
      }
    },
  });

  const { mutateAsync: verifyUserCode } = useMutation({
    mutationFn: verifyCode,
    onSuccess: async (data) => {
      await signupNewUser({ email: email, password: password });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(err.response?.data?.message ?? "Unexpected Error");
      }
    },
  });

  const { mutateAsync: resendCode } = useMutation({
    mutationFn: resendEmailVerificationCode,
    onSuccess: (data) => {
      console.log("Resend Code Successful:", data);
      displaySuccessToast("Verification code is sent!");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(err.response?.data?.message ?? "Unexpected Error");
        if (err.response.data.message === 'Validation Code is Expired'){
          navigate(WEB_ROUTE_PATHS.signup)
          return;
        }
      }
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await verifyUserCode({ email: email, code: values.code });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
    }
  };

  const handleOnChange = (e, index, setFieldValue, values) => {
    const value = e.target.value;
    const newCode = [...values.code];
    newCode[index] = value.slice(0, 1);
    setFieldValue("code", newCode, true);

    if (value && index < emailValidationInputRefs.current.length - 1) {
      emailValidationInputRefs.current[index + 1].focus();
    }

    if (newCode.every((code) => code !== "")) {
      setAllFieldsFilled(true);
      setIsReset(false);
    }
  };

  const resetInputValues = (setFieldValue) => {
    setFieldValue("code", Array(6).fill(""));
    setIsReset(true);
  };

  const resentVerificationCode = async (setFieldValue) => {
    resetInputValues(setFieldValue);
    try {
      setIsResending(true)
      await resendCode({ email, password });
      setIsResending(false)
    } catch (err) {
      setIsResending(false)
    }
  };

  return (
    <div className="bg-gray-light">
      <div className="flex items-center justify-center min-h-screen">
        <Formik
          initialValues={{ code: Array(6).fill("") }}
          validationSchema={emailVerification}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, setFieldValue, values }) => (
            <Form className="w-4/5 md:w-2/3 lg:w-2/5 bg-gray-100 p-8 rounded shadow-lg space-y-5">
              <ChevronLeftIcon
                onClick={() => navigate(`${WEB_ROUTE_PATHS.signup}`)}
                className="size-7 opacity-50 hover:opacity-100 hover:cursor-pointer"
              />
              <div className="w-full text-center">
                <span className="text-2xl font-bold">Email Verification</span>
              </div>

              <div className="flex justify-center items-center space-x-5">
                {allFieldsFilled && (
                  <ArrowPathIcon
                    onClick={() => resetInputValues(setFieldValue)}
                    className="size-7 opacity-50 hover:opacity-100 hover:cursor-pointer"
                  />
                )}

                {[...Array(6)].map((_, index) => (
                  <div key={index} className="relative">
                    <CustomVerificationInputField
                      name={`code[${index}]`}
                      id={`code-${index}`}
                      ref={(ref) =>
                        (emailValidationInputRefs.current[index] = ref)
                      }
                      onChange={(e) =>
                        handleOnChange(e, index, setFieldValue, values)
                      }
                      maxLength="1"
                    />
                  </div>
                ))}
              </div>

              {allFieldsFilled && errors.code && !isReset && (
                <div className="text-warning-red-heavy text-sm font-semibold my-1">
                  Verification code must be exactly 6 digits.
                </div>
              )}

              <div className="flex flex-row items-center">
                <CustomButton
                  type="button"
                  style={isResending ? "disabled-only-word" : "only-word"}
                  text="Resend"
                  loading={isResending}
                  disabled={isResending}
                  spinner={true}
                  spinnerSize="4"
                  onClick={() => resentVerificationCode(setFieldValue)}
                />
                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  style={isSubmitting ? "disabled-wide-70-btn" : "wide-70-btn"}
                  varient="sign-up-submit-btn"
                  text="Enter"
                  loading={isSubmitting}
                  spinner={true}
                  spinnerSize="4"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
