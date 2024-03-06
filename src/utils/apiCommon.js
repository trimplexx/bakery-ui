import axios from 'axios';
import {connectionUrlString} from "./props";
import handleApiError from './apiUtils';

const apiCommon = {
    verifyToken: async (setIsAdmin, setIsLoggedIn, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(connectionUrlString + 'api/UserVerify/verifyToken', {
                    token
                });
                setIsAdmin(response.data === 2);
                setIsLoggedIn(true);
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.setItem('errorNotifyStorage', 'Nastąpiło wylogowanie!');
            window.location.reload(true);
            setIsLoggedIn(false);
        }
    },
    makeOrder: async (products, dateTime, status, phone, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Ordering/makeOrder', products, {
                headers: {
                    dateTime: dateTime,
                    status: status,
                    phone: phone
                }
            });
            successNotify(response.data);
            localStorage.removeItem('productList');
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchMaximumProductQuantity: async (dateTime, productId, setMaxQuantity, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/Ordering/productQuantityLeft', {
                params: {
                    productId: productId,
                    dateTime: dateTime
                }
            });
            setMaxQuantity(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
            setMaxQuantity(0);
        }
    },
    cancelOrder: async (orderId, errorNotify, successNotify, newStatus) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Ordering/cancelOrder', {}, {
                headers: {
                    orderId : orderId
                }
            });
            successNotify(response.data);
            newStatus = 3;
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    forgotPassword: async (data, setIsLoading, onClose, successNotify, errorNotify) => {
        setIsLoading(true);
        try {
            const response = await axios.post(connectionUrlString + 'api/ForgotPassword/forgotPassword', {}, {
                headers: {
                    email: data.email
                }
            });
            setIsLoading(false);
            onClose();
            successNotify(response.data);
        } catch (error) {
            setIsLoading(false);
            handleApiError(error, errorNotify);
        }
    },
    resetPassword: async (data, token, setIsLoading, navigate, successNotify, errorNotify) => {
        setIsLoading(true);
        try {
            const response = await axios.put(connectionUrlString + 'api/ForgotPassword/resetPassword', {
                token
            }, {
                headers: {
                    password: data.password
                }
            });
            setIsLoading(false);
            navigate("/");
            successNotify(response.data);
        } catch (error) {
            setIsLoading(false);
            handleApiError(error, errorNotify);
        }
    },
    verifyForgotToken: async (token, setIsLoading, navigate, errorNotify) => {
        setIsLoading(true);
        try {
            await axios.post(connectionUrlString + 'api/ForgotPassword/tokenVerification', {
                token
            });
            setIsLoading(false);
        } catch (error) {
            navigate("/");
            handleApiError(error, errorNotify);
            setIsLoading(false);
        }
    },
    verifyUser: async (token, setIsLoading, navigate, errorNotify, successNotify) => {
        setIsLoading(true);
        try {
            const response = await axios.post(connectionUrlString + 'api/UserVerify/emailVerification', {
                token
            });
            navigate("/");
            successNotify(response.data);
            setIsLoading(false);
        } catch (error) {
            navigate("/");
            handleApiError(error, errorNotify);
            setIsLoading(false);
        }
    },
};

export default apiCommon;
