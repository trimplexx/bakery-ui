import { useEffect, useState } from 'react';
import {errorNotify} from "../helpers/ToastNotifications";
import apiCommon from "../utils/apiCommon";


const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            await apiCommon.verifyToken(setIsAdmin, setIsLoggedIn, errorNotify)
        };
        verifyToken();
    }, []);

    return { isAdmin, isLoggedIn };
};

export default useAuth;