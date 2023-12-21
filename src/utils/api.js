import axios from 'axios';
import {successNotify} from "../helpers/ToastNotifications";
import {connectionUrlString} from "./props";
import {jwtDecode} from "jwt-decode";
function handleApiError(error, errorNotify) {
    if (error.response && error.response.data && error.response.data.error) {
        errorNotify(error.response.data.error);
    } else {
        errorNotify('Błąd połączenia serwera');
    }
}

const api = {

    register: async (data, successNotify, errorNotify, onLoginClick, setIsLoading) => {
        try {
            await axios.post(connectionUrlString + "api/Auth/Register", data);
            successNotify('Pomyślnie zarejestrowano');
            onLoginClick();
        } catch (error) {
            handleApiError(error, errorNotify);
        }
        finally {
            setIsLoading(false);
        }
    },
    login: async (data, setIsLoading, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Auth/Login', data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('successNotifyStorage', 'Poprawnie zalogowano');
            window.location.reload(true);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
        finally{
            setIsLoading(false);
        }
    },
    verifyToken: async (setIsAdmin, setIsLoggedIn, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(connectionUrlString + 'api/Auth/VerifyToken', {
                    Token: token
                });
                const decodedToken = jwtDecode(token);
                setIsAdmin(decodedToken.Rank === '2');
                setIsLoggedIn(true);
            }
        } catch (error) {
            errorNotify('Nastąpiło wylogowanie!', true);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }
    },
    fetchSingleUser: async (userId, setUserData, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminUser/getSingleUser', {
                headers: {
                    'UserId': userId
                }
            });
            const userDataFromAPI = response.data;
            setUserData({
                firstName: userDataFromAPI.first_name,
                lastName: userDataFromAPI.last_name,
                phone: userDataFromAPI.phone,
                email: userDataFromAPI.email
            });
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductCategories: async (setOptions, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/getProductsCategories');
            const categories = response.data;


            const allOption = { value: null, label: 'Wszystkie' };
            const newOptions = [allOption, ...categories.map(category => ({
                value: category.categoryId,
                label: category.name
            }))];

            setOptions(newOptions);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    addProduct: async ( formData, successNotify, errorNotify, onClose, setIsLoading) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminProducts/addProduct', formData);
            successNotify(response.data.message);
            onClose();
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    },
    editProduct: async ( formData, productId, successNotify, errorNotify, onClose, setIsLoading) => {
        try {
            const response = await axios.put(connectionUrlString + 'api/AdminProducts/editProduct', formData, {
                headers: {
                    productId : productId
                }
            });
            successNotify(response.data.message);
            onClose();
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    },
    fetchSingleProduct: async (productId, setProductsData, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/getSingleProduct', {
                headers: {
                    'ProductId': productId
                }
            });
            setProductsData(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsList: async (offset, category, searchTerm, setProducts, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminProducts/getProductsList', {
                offset: offset,
                category: category,
                searchTerm: searchTerm
            });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsPaginationNumber: async (searchTerm, category, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/getNumberOfProducts',
                {
                    headers: {
                        searchTerm: searchTerm,
                        category: category
                    }
                });
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    deleteProduct: async (productId, successNotify, errorNotify) => {
        try {
            const response = await axios.delete(connectionUrlString + 'api/AdminProducts/deleteProduct', {
                headers: {
                    productId: productId
                }
            });
            successNotify(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUsersList: async (offset, searchTerm, setUsers, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminUser/getUsersList', {
                searchTerm : searchTerm,
                offset : offset
            });
            setUsers(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUsersPaginationNumber: async (setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminUser/getNumberOfUsers');
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    adminChangeUserData: async (data, setIsLoading, errorNotify, successNotify) => {
        try {
            const response = await axios.put(connectionUrlString + 'api/AdminUser/editUser', data);
            successNotify(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
        finally{
            setIsLoading(false);
        }
    },
    deleteUser: async (userId, successNotify, errorNotify) => {
        try {
            const response = await axios.delete(connectionUrlString + 'api/AdminUser/deleteUser', {
                headers: {
                    userId: userId
                }
            });
            successNotify(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    getProductsQuantity: async (dateTime, setProductsList, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProduction/getProductsQuantity', {
                headers: {
                    'DateTime': dateTime
                }
            });
            setProductsList(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    updateProductsAvailability: async ( products, dateTime, successNotify, errorNotify) => {
        try {
            const response = await axios.put(connectionUrlString + 'api/AdminProduction/updateProductsAvailability', products, {
                headers: {
                    'DateTime': dateTime
                }
            });
            successNotify(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsToSelect: async (setOptions, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMakingOrder/getProductsToSelect');
            const newOptions = response.data.map(products => ({
                value: products.productId,
                label: products.name
            }));
            setOptions(newOptions);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchMaximumProductQuantity: async (dateTime, productId, setMaxQuantity, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMakingOrder/getProductQuantityLeft', {
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
    makeOrder: async (products, dateTime, status, phone, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminMakingOrder/makeOrder', products, {
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
    fetchOrdersList: async (offset, dateTime, phone, setUsers, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminOrders/getOrdersList', {
                headers:{
                    offset: offset,
                    dateTime: dateTime,
                    phone: phone
                }

            });
            setUsers(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchOrdersPaginationNumber: async (dateTime, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminOrders/getNumberOfOrders', {
                    headers:{
                        dateTime: dateTime
                    }});
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    changeOrderStatus: async (orderId, errorNotify, successNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminOrders/changeOrderStatus', null,{
                headers:{
                    orderId: orderId
                }});
            successNotify(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchLastDaysSalary: async (setLastDaysSalary, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMainPage/getLastDaysSalary')
            setLastDaysSalary(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsLeft: async (setProductsLeft, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMainPage/getProductsLeft')
            setProductsLeft(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUnfulfilledOrders: async (setUnfulfilledOrders, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMainPage/getUnfulfilledOrders')
            setUnfulfilledOrders(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchNumberOfOrders: async (setNumberOfOrders, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMainPage/getNumberOfOrders')
            setNumberOfOrders(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
};

export default api;
