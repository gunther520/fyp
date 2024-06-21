import * as Yup from 'yup';
import {
    emailRule,
    passwordRule,
} from "./schemaRules";

const loginFormSchema = Yup.object({
    email: emailRule,
    password: passwordRule,
});

export {
    loginFormSchema
}