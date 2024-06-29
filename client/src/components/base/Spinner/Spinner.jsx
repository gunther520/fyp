import React from "react";
import styles from "./styles";

const Spinner = ({ size }) => {
  return (
    <div className={`${styles['default']} size-${size}`}></div>
  );
};

export default Spinner;
