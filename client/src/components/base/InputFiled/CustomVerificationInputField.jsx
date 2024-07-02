import React, { forwardRef } from "react";
import { Field } from 'formik';
import { styles } from "./styles";

const CustomVerificationInputField = forwardRef(
  ({ id, name, onChange }, ref) => { 
    return (
      <Field name={name}> 
        {({ field }) => ( 
          <input
            {...field} 
            type="text"
            id={id} 
            className={`${styles["verification-code-input"]}`}
            ref={ref} 
            maxLength="1" 
            onChange={onChange}
          />
        )}
      </Field>
    );
  }
);

export default CustomVerificationInputField;