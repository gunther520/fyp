import React from "react";
import { styles, varients } from "./styles";
import Spinner from "../Spinner/Spinner";

const CustomButton = ({
  type,
  disabled,
  style,
  varient,
  text,
  loading,
  spinner,
  spinnerSize,
  onClick,
  countdown,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={
        styles[style]
          ? varients[varient]
            ? `${styles[style]} ${varients[varient]}`
            : styles[style]
          : styles["default"]
      }
      onClick={onClick}
    >
      <div className="flex justify-center items-center flex-row gap-3">
        {text}
        {loading && spinner && <Spinner size={spinnerSize} />}
        {!loading && countdown > 0 && (
          <div className="font-semibold text-gray-default">{`(${countdown}s)`}</div>
        )}
      </div>
    </button>
  );
};

export default CustomButton;
