import { useEffect, useState } from 'react';

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
            if(decodedToken.isAdmin === 'True')
                setIsAdmin(true);
        }
    }, []);

    return { isAdmin, isLoggedIn };
};


export default useAuth;