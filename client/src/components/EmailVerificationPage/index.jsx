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
import { ErrorMessages, SuccessMessages } from "../../utils/constants/Message";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password } = location.state || {};
  const emailValidationInputRefs = useRef([]);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isResetButtonEnabled, setIsResetButtonEnabled] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isResendButtonEnabled, setIsResendButtonEnabled] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const { mutateAsync: signupNewUser } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      displaySuccessToast(SuccessMessages.SIGNUP_SUCCESS);
      navigate(WEB_ROUTE_PATHS.login);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(
          err.response?.data?.message ?? ErrorMessages.UNEXPECTED_ERROR
        );
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
        displayErrorToast(
          err.response?.data?.message ?? ErrorMessages.UNEXPECTED_ERROR
        );
        if (
          err.response?.data.message === ErrorMessages.INTERNAL_SERVER_ERROR
        ) {
          navigate(WEB_ROUTE_PATHS.signup);
          return;
        }
      }
    },
  });

  const { mutateAsync: resendCode } = useMutation({
    mutationFn: resendEmailVerificationCode,
    onSuccess: (data) => {
      displaySuccessToast(SuccessMessages.SEND_VERIFICATION_CODE_SUCCESS);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        displayErrorToast(
          err.response?.data?.message ?? ErrorMessages.UNEXPECTED_ERROR
        );
        if (
          err.response?.data.message === ErrorMessages.VERIFICATION_CODE_EXPIRE
        ) {
          navigate(WEB_ROUTE_PATHS.signup);
          return;
        }
        if (err.response.data.message === ErrorMessages.INTERNAL_SERVER_ERROR) {
          navigate(WEB_ROUTE_PATHS.signup);
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

    if (newCode[0]) {
      setIsResetButtonEnabled(true);
    }

    if (newCode.every((code) => code !== "")) {
      setAllFieldsFilled(true);
    }
  };

  const startCountdown = (duration) => {
    setCountdown(duration);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          setIsResendButtonEnabled(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const resetInputValues = (setFieldValue) => {
    setFieldValue("code", Array(6).fill(""));
    setIsResetButtonEnabled(false);
    emailValidationInputRefs.current[0].focus();
  };

  const resentVerificationCode = async (setFieldValue) => {
    resetInputValues(setFieldValue);
    setIsResendButtonEnabled(false);
    try {
      setIsResending(true);
      await resendCode({ email, password });
      setIsResending(false);
      startCountdown(5);
    } catch (err) {
      setIsResending(false);
    } finally {
      setIsResendButtonEnabled(false);
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
                {values.code[0] !== "" && (
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

              {allFieldsFilled && errors.code && !isResetButtonEnabled && (
                <div className="text-warning-red-heavy text-sm font-semibold my-1">
                  Verification code must be exactly 6 digits.
                </div>
              )}

              <div className="flex flex-row items-center w-full md:w-3/5 ml-6 sm:ml-6 md:ml-32">
                <CustomButton
                  type="button"
                  style={
                    isResending || countdown > 0
                      ? "disabled-only-word"
                      : "only-word"
                  }
                  text="Resend"
                  loading={isResending}
                  disabled={!isResendButtonEnabled}
                  spinner={true}
                  spinnerSize="4"
                  onClick={() => resentVerificationCode(setFieldValue)}
                  countdown={countdown}
                />
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || isResending}
                  style={
                    isSubmitting ? "disabled-wide-half-btn" : "wide-half-btn"
                  }
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
