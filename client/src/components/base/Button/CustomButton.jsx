import React from "react";
import { styles, varients } from './styles';

const CustomButton = ({ type, disabled, style, varient, text, }) => {
  return (
    <button 
      type={type} 
      disabled={disabled}
      className={styles[style] ? 
        (varients[varient] ? `${styles[style]} ${varients[varient]}` : styles[style]) : styles['default']}> {text}
    </button>
  );

};

export default CustomButton;