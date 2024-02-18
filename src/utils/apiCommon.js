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
};

export default apiCommon;
