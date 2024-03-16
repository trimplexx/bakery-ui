import {useEffect} from 'react';
import {errorNotifyStorage, successNotifyStorage} from "../helpers/ToastNotifications";

const useToastStorage = () => {
    useEffect(() => {
        const successNotificationContent = localStorage.getItem('successNotifyStorage');
        const errorNotificationContent = localStorage.getItem('errorNotifyStorage');
        if (successNotificationContent) {
            successNotifyStorage();
            localStorage.removeItem('successNotifyStorage');
        }
        if (errorNotificationContent) {
            errorNotifyStorage();
            localStorage.removeItem('errorNotifyStorage');
        }
        successNotifyStorage();
    }, []);
}

export default useToastStorage;
