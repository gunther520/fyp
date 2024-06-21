import * as Yup from 'yup';

const emailRule = Yup
    .string()
    .email('Invalid Email Format')
    .required('Email Is Required');

const passwordRule = Yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password Is Required');

export {
    emailRule,
    passwordRule,
}
