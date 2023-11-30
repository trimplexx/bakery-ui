import { toast } from 'react-toastify';
import './ToastNotifications.css'

export const successNotifyStorage = () => {
    const content = localStorage.getItem('successNotifyStorage');
    if (content && !toast.isActive('successNotifyStorage')) {
        toast.success(content, {
            className: "notifyStorage",
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const successNotify = (content, isNavBar) => {
    if (content) {
        toast.success(content, {
            className: isNavBar ? "notifyStorage" : undefined,
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const errorNotifyStorage = () => {
    const content = localStorage.getItem('errorNotifyStorage');
    if (content && !toast.isActive('errorNotifyStorage')) {
        toast.error(content, {
            className: "notifyStorage",
            toastId: 'logout',
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const errorNotify = (content, isNavBar) => {
    if (!toast.isActive('login')) {
        toast.error(content, {
            className: isNavBar ? "notifyStorage" : undefined,
            toastId: 'login',
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}
