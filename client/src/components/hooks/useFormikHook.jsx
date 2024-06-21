import { useFormik } from 'formik';

const useFormikHook = (initialFieldValues, validationSchema, onSubmit) => {
  const formik = useFormik({
    initialFieldValues,
    validationSchema,
    onSubmit,
  });

  return { formik };
};