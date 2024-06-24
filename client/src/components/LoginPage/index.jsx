import React from 'react';
import {Formik, Form, Field, ErrorMessage, useFormikContext} from 'formik';
import loginFormSchema from './loginFormSchema';


const LoginPage = () => {
    const handleSubmit = (data, { setSubmitting }) => {
        console.log("Login Submitted", data);
        setSubmitting(false);
        // Here you would usually submit the form values to the backend
    };

    return (
        <div className='bg-gray-500'>
          <h2>Login</h2>
          
          <div className="flex items-center justify-center min-h-screen bg-white">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, isSubmitting }) => (
                <Form className="w-95 bg-gray-100 p-8 rounded drop-shadow-lg space-y-5">
                    <div>
                      <Field 
                        type="email" 
                        name="email" 
                        placeholder="Enter Email" 
                        className={`block w-full px-4 py-2 mt-2 bg-white border-2 rounded-md shadow-sm placeholder-slate-400 focus:ring-2 focus:border-transparent border-slate-300 ${errors.email ? 'focus:ring-red-500 bg-red-50 border-red-300 ring-offset-2 focus:outline outline-red-300' : 'focus:ring-blue-500 focus:outline-none' }`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm font-semibold my-1"/>
                    </div>
                    <div>
                      <Field 
                        type="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        className={`block w-full px-4 py-2 mt-2 bg-white border-2 rounded-md shadow-sm placeholder-slate-400 focus:ring-2 focus:border-transparent border-slate-300 ${errors.password ? 'focus:ring-red-500 bg-red-50 border-red-300 ring-offset-2 focus:outline outline-red-300' : 'focus:ring-blue-500 focus:outline-none' }`} 
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm font-semibold my-1"/>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className='block bg-gray-400 text-white text-sm font-semibold px-4 py-2 mx-auto mt-4 rounded-full border-2 border-dashed border-gray-400 hover:bg-transparent hover:text-gray-500'>
                    Login
                    </button>
                </Form>
                )}
            </Formik>
        </div>

      </div>
    )
}
 
export default LoginPage;