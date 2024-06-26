import axios from 'axios';
import {connectionUrlString} from "./props";
import handleApiError from './apiUtils';

const apiCommon = {
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
    fetchMaximumProductQuantity: async (dateTime, productId, setMaxQuantity, setQuantityProductInfo, setIsErrorVisible, setIsInfoVisible) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/Ordering/productQuantityLeft', {
                params: {
                    productId: productId,
                    dateTime: dateTime
                }
            });
            if (setIsInfoVisible != null && setIsErrorVisible != null) {
                setIsInfoVisible(true);
                setIsErrorVisible(false);
                setQuantityProductInfo("Dostępność produktu na dzień: " + dateTime + " wynosi: " + response.data);
            }
            setMaxQuantity(response.data);
        } catch (error) {
            if (setIsInfoVisible != null && setIsErrorVisible != null) {
                setIsInfoVisible(false);
                setIsErrorVisible(true);
            }
            if (error.response && error.response.data && error.response.data.error) {
                setQuantityProductInfo(error.response.data.error);
            } else {
                setQuantityProductInfo('Brak informacji o dostępnej ilości produktu.');
            }
            setMaxQuantity(0);
        }
    },
    cancelOrder: async (orderId, errorNotify, successNotify, newStatus) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Ordering/cancelOrder', {}, {
                headers: {
                    orderId: orderId
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
    verifyUser: async (token, navigate, errorNotify, successNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/UserVerify/emailVerification', {
                token
            });
            navigate("/");
            successNotify(response.data);
        } catch (error) {
            navigate("/");
            handleApiError(error, errorNotify);
        }
    },
};

export default apiCommon;
