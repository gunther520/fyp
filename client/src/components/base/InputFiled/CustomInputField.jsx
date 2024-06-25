import React from "react";
import { Field } from 'formik';
import { styles } from './styles';

const CustomInputField = ({ type, name, placeholder, text, style}) => {
    return (
      <Field type={type} name={name} placeholder={placeholder} className={`${styles[style] ? styles[style] : style['default']}`}>{text}</Field>
    );   
};

export default CustomInputField;