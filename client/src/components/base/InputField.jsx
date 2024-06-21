import { Field } from 'formik';
const InputField = ({name, ...props }) => (
    // for styling
    <Field name={name} {...props} className="block w-full px-4 py-2 mt-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
);

export {
    InputField,
}