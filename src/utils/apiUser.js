import axios from 'axios';
import {connectionUrlString} from "./props";
import handleApiError from './apiUtils';

const apiUser = {
    register: async (data, successNotify, errorNotify, onLoginClick, setIsLoading) => {
        try {
            console.log(data)
            await axios.post(connectionUrlString + "api/Auth/register", data);
            successNotify('Pomyślnie zarejestrowano, potwierdź swój adres email aby się zalogować!');

            onLoginClick();
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    }, login: async (data, setIsLoading, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Auth/login', data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('successNotifyStorage', 'Poprawnie zalogowano');
            window.location.reload(true);
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    }, fetchUserProductsList: async (dateTime, offset, category, searchTerm, setProducts, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Products/productsList', {
                offset: offset, category: category, searchTerm: searchTerm
            }, {
                headers: {
                    dateTime: dateTime
                }
            });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    }, fetchProductsAvailability: async (dateTime, data, setProductsAvailability, errorNotify) => {
        try {

            const response = await axios.post(connectionUrlString + 'api/Products/singleProduct', data, {
                headers: {
                    dateTime: dateTime
                }
            });

            setProductsAvailability(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    }, checkPhoneMakingOrder: async (phone, setResponse, errorNotify) => {
        try {

            const response = await axios.get(connectionUrlString + 'api/Ordering/checkPhoneMakingOrder', {
                headers: {
                    phone: phone
                }
            });
            setResponse(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    }, userMakeOrder: async (products, dateTime, status, phone, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Ordering/makeOrder', products, {
                headers: {
                    dateTime: dateTime, status: status, phone: phone
                }
            });
            localStorage.removeItem(dateTime);
            localStorage.setItem('successNotifyStorage', response.data);
            window.location.reload(true);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    }, userChangePassword: async (data, setIsLoading, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/UserPanel/changePassword', data);
            successNotify(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    }, getOfOrdersPagination: async (phone, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/UserPanel/numberOfOrders', {
                headers: {
                    phone: phone
                }
            });
            setPaginationNumber(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    }, getUserOrdersHistoryList: async (offset, phone, setOrders, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/UserPanel/userOrdersHistoryList', {
                headers: {
                    offset: offset, phone: phone
                }
            });
            setOrders(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },

}

export default apiUser;
