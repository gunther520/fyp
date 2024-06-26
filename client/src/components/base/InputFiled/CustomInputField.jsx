import React from "react";
import { Field } from 'formik';
import { styles } from './styles';

const CustomInputField = ({ type, name, id, placeholder, text, style}) => {
    return (
      <Field type={type} id={id} name={name} placeholder={placeholder} className={`${styles[style] ? styles[style] : style['default']}`}>{text}</Field>
    );   
};

export default CustomInputField;