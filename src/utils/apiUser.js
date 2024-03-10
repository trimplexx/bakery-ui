import axios from 'axios';
import {connectionUrlString} from "./props";
import handleApiError from './apiUtils';
import {errorNotify} from "../helpers/ToastNotifications";

const apiUser = {
    register: async (data, successNotify, errorNotify, onLoginClick, setIsLoading) => {
        try {
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
                offset: offset, categories: category , searchTerm: searchTerm
            }, {
                headers: {
                    dateTime: dateTime
                }
            });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductCategories: async (setOptions, categoryIds, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/productsCategories',
                {
                    headers: {
                        categoryIds : categoryIds
                    }
                });
            const categories = response.data;
            const newOptions = {};
            categories.forEach(category => {
                newOptions[category.name] = category.categoryId;
            });

            setOptions(newOptions);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsAvailability: async (dateTime, data, setProductsAvailability, errorNotify) => {
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
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(connectionUrlString + 'api/UserPanel/changePassword', data, {
                    headers: {
                        token : token
                    }
                });
                successNotify(response.data)
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    }, getOfOrdersPagination: async (userId, setPaginationNumber, errorNotify) => {
        try {

            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(connectionUrlString + 'api/UserPanel/numberOfOrders', {
                    headers: {
                        userId: userId,
                        token: token
                    }
                });
                setPaginationNumber(response.data)
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    getUserOrdersHistoryList: async (offset, userId, setOrders, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(connectionUrlString + 'api/UserPanel/userOrdersHistoryList', {
                    headers: {
                        offset: offset,
                        userId: userId,
                        token: token
                    }
                });
                setOrders(response.data)
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    checkIfUserGotPassword: async (userId, setIsGotPassword, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(connectionUrlString + 'api/UserPanel/checkIfPassword', {
                    headers: {
                        userId: userId,
                        token: token
                    }
                });
                setIsGotPassword(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    handleGmailLogin: async (errorNotify, setIsLoading) =>{
        try{
            const response = await  axios.get(connectionUrlString + "api/Auth/gmailLogin");
            window.location.href = response.data;
            setIsLoading(false);
        }catch (error){
            handleApiError(error, errorNotify);
            setIsLoading(false);
        }
    },
    gmailSession: async (token, setIsLoading, navigate, errorNotify, successNotify) => {
        setIsLoading(true);
        try {
            const response = await axios.post(connectionUrlString + 'api/UserVerify/verifyToken', {
                token
            });
            if(response.status === 200)
            {
                localStorage.setItem('token', token);
                localStorage.setItem('successNotifyStorage', 'Poprawnie zalogowano');
                navigate("/");
                window.location.reload(true);
                setIsLoading(false);
            }
        } catch (error) {
            navigate("/");
            handleApiError(error, errorNotify);
            setIsLoading(false);
        }
    },
}

export default apiUser;
