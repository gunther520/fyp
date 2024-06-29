import React from "react";
import { styles, varients } from "./styles";
import Spinner from "../Spinner/Spinner";

const CustomButton = ({ type, disabled, style, varient, text, loading, spinner, spinnerSize }) => {
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
    >
      <div className="flex justify-center items-center flex-row gap-3">
        {text}
        {loading && spinner && <Spinner size={spinnerSize}/>}
      </div>
    </button>
  );
};

export default CustomButton;
