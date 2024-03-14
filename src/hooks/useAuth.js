import { useEffect, useState } from 'react';
import {errorNotify} from "../helpers/ToastNotifications";
import apiCommon from "../utils/apiCommon";


const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            setIsAdmin(decodedToken.isAdmin)
        }
    }, []);

    return { isAdmin, isLoggedIn };
};

export default useAuth;