import React, { useState } from "react";
import { Field } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { styles } from "./styles";

const CustomInputField = ({ type, name, id, placeholder, style }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Field name={name}>
        {
          ({ field, meta }) => (
            <>
              <input
                type={showPassword ? "text" : type}
                id={id}
                placeholder={placeholder}
                className={`${styles[style] ? styles[style] : styles["default"]}`}
                {...field}
              />

              <div className="absolute inset-y-0 right-3 flex items-center">
                {type === "password" && (
                  <button
                    onClick={togglePasswordVisibility}
                    className="p-2 focus:outline-none"
                    type="button"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-5 text-black cursor-pointer" />
                    ) : (
                      <EyeIcon className="size-5 text-black cursor-pointer" />
                    )}
                  </button>
                )}
                {meta.error && meta.touched && (
                  <ExclamationCircleIcon className="size-5 text-warning-red-heavy" />
                )}
              </div>
            </>
          )
        }
      </Field>
    </div>
  );
};

export default CustomInputField;