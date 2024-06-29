import { toast } from "react-toastify";

const displaySuccessToast = (title, message) => {
  toast.success(title);
};

const displayErrorToast = (title, message) => {
  toast.error(title);
};

export { displaySuccessToast, displayErrorToast };
