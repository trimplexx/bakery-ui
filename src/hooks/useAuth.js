import { useEffect, useState } from 'react';
import {errorNotify} from "../helpers/ToastNotifications";
import api from "../utils/api";

const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            await api.verifyToken(setIsAdmin, setIsLoggedIn, errorNotify)
        };
        verifyToken();
    }, []);

    return { isAdmin, isLoggedIn };
};

export default useAuth;