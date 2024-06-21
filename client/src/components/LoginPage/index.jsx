import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import loginFormSchema from './loginFormSchema';
import { InputField } from "../base/InputField";


const LoginPage = () => {
    const handleSubmit = (data, { setSubmitting }) => {
        console.log("Login Submitted", data);
        setSubmitting(false);
        // Here you would usually submit the form values to the backend
    };

    return (
        <div>
        <h2>Login</h2>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="email" name="email" placeholder="Enter Email" className="block w-full px-4 py-2 mt-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
              </div>
              <div>
                <Field type="password" name="password" placeholder="Enter Password" className="block w-full px-4 py-2 mt-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
}
 
export default LoginPage;