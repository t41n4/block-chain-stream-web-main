
import { Flip, ToastOptions, toast } from "react-toastify";

const toastOptions: ToastOptions = {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    progress: undefined,
    theme: "light",
    transition: Flip
}

export const notifyError = (message: string) => toast.error(message, toastOptions);
export const notifySuccess = (message: string) => toast.success(message, toastOptions);
export const notifyWarning = (message: string) => toast.warning(message, toastOptions);



