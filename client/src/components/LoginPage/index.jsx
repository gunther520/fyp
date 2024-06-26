import React from 'react';
import {Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import loginFormSchema from './loginFormSchema';
import CustomInputField from '../base/InputFiled/CustomInputField';
import CustomButton from '../base/Button/CustomButton';


const LoginPage = () => {
    const handleSubmit = (data, { setSubmitting }) => {
        console.log("Login Submitted", data);
        setSubmitting(false);
        // Here you would usually submit the form values to the backend
    };

    return (
        <div className='bg-gray-light'>
          
          <div className="flex items-center justify-center min-h-screen">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, isSubmitting, touched }) => (
                <Form className="w-4/5 md:w-2/3 lg:w-2/5 bg-gray-100 p-8 rounded shadow-lg space-y-5">

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold">Email:</label>
                      <CustomInputField 
                        type='email'
                        name='email'
                        id='email' 
                        placeholder='Enter Email' 
                        style={`${errors.email && touched.email ? 'error' : 'no-error'}`}
                      />
                      <ErrorMessage name="email" component="div" className="text-warning-red-heavy text-sm font-semibold my-1"/>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold">Password:</label>
                      <CustomInputField 
                        type='password'
                        name='password'
                        id='password' 
                        placeholder='Enter Password'
                        style={`${errors.password && touched.password ? 'error' : 'no-error'}`}
                      />
                      <ErrorMessage name="password" component="div" className="text-warning-red-heavy text-sm font-semibold my-1"/>
                    </div>

                    <div className="flex flex-col item-center justify-center gap-2">
                      <div className="flex justify-center gap-2">
                        <Link to='/signup' className='text-sm font-semibold text-blue-url hover:underline'>
                          Forgot Password?
                        </Link>
                      </div>
                      
                      <div className="flex w-full items-center justify-center gap-2">
                        <div className="w-1/2 border border-gray-default"></div>
                        <p className="text-gray-heavy text-sm font-semibold">Or</p>
                        <div className="w-1/2 border border-gray-default"></div>
                      </div>

                      <div className="flex justify-center gap-2">
                        <span className='text-sm font-semibold'>Do not have an account?</span>
                        <Link to='/signup' className='text-sm font-semibold text-blue-url hover:underline'>
                          Sign up
                        </Link>
                      </div>
                
                    </div>

                    <CustomButton 
                      type='submit'
                      disabled={isSubmitting}
                      style='wide-btn'
                      varient='login-submit-btn'
                      text='Login'
                    />
                </Form>
                )}
            </Formik>
        </div>

      </div>
    )
}
 
export default LoginPage;