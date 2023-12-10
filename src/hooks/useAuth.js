import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {connectionUrlString} from "../utils/props";
import {errorNotify} from "../helpers/ToastNotifications";

const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post(connectionUrlString + 'api/Auth/VerifyToken', {
                Token: token
            })
                .then(response => {
                    const decodedToken = jwtDecode(token);
                    setIsAdmin(decodedToken.Rank === "2");
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    errorNotify('Nastąpiło wylogowanie!', true);
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                });
        }
    }, []);

    return { isAdmin, isLoggedIn };
};

export default useAuth;