import axios from 'axios';
import {successNotify} from "../helpers/ToastNotifications";

const api = {
    register: async (connectionUrlString, data, successNotify, errorNotify, onLoginClick, setIsLoading) => {
        try {
            await axios.post(connectionUrlString + "api/Auth/Register", data);
            successNotify('Pomyślnie zarejestrowano');
            onLoginClick();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
        finally {
            setIsLoading(false);
        }
    },
    login: async (connectionUrlString, data, setIsLoading, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Auth/Login', data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('successNotifyStorage', 'Poprawnie zalogowano');
            window.location.reload(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
        finally{
            setIsLoading(false);
        }
    },
    fetchSingleUser: async (connectionUrlString, userId, setUserData, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminUser/singleUser', {
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
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    fetchProductCategories: async (connectionUrlString, setOptions, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/productsCategories');
            const newOptions = response.data.map(category => ({
                value: category.categoryId,
                label: category.name
            }));
            setOptions(newOptions);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    addProduct: async (connectionUrlString, formData, successNotify, errorNotify, onClose, setIsLoading) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminProducts/AddProduct', formData);
            successNotify(response.data.message);
            onClose();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        } finally {
            setIsLoading(false);
        }
    },
    fetchSingleProduct: async (connectionUrlString, productId, setProductsData, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/singleProduct', {
                headers: {
                    'ProductId': productId
                }
            });
            setProductsData(response.data)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    fetchProductsList: async (connectionUrlString, setProducts, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/productsList');
            setProducts(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    deleteProduct: async (connectionUrlString, productId, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminProducts/deleteProduct', {
                productId: productId
            });
            successNotify(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    adminChangeUserData: async (connectionUrlString, data, setIsLoading, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminUser/editUser', data);
            successNotify(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
        finally{
            setIsLoading(false);
        }
    },
    deleteUser: async (connectionUrlString, userId, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminUser/deleteUser', {
                userId: userId
            });
            successNotify(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    getProductsQuantity: async (connectionUrlString, dateTime, setProductsList, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProduction/productsQuantity', {
                headers: {
                    'DateTime': dateTime
                }
            });
            setProductsList(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    updateProductsAvailability: async (connectionUrlString, products, dateTime, successNotify, errorNotify) => {
        try {
            const response = await axios.put(connectionUrlString + 'api/AdminProduction/updateProductsAvailability', products, {
                headers: {
                    'DateTime': dateTime
                }
            });
            successNotify(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    fetchProductsToSelect: async (connectionUrlString, setOptions, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMakingOrder/productsToSelect');
            const newOptions = response.data.map(products => ({
                value: products.productId,
                label: products.name
            }));
            setOptions(newOptions);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
    fetchMaximumProductQuantity: async (connectionUrlString, dateTime, productId, setMaxQuantity, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminMakingOrder/getProductQuantityLeft', {
                params: {
                    productId: productId,
                    dateTime: dateTime
                }
            });
            setMaxQuantity(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Błąd połączenia serwera");
            }
        }
    },
};

export default api;
