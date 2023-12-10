import axios from 'axios';

const api = {
    register: async (connectionUrlString, data, successNotify, errorNotify, onLoginClick, setIsLoading) => {
        try {
            await axios.post(connectionUrlString + "api/Auth/Register", data);
            successNotify('Pomyślnie zarejestrowano');
            onLoginClick();
        } catch (error) {
            errorNotify(error.response.data.error)
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
            errorNotify(error.response.data.error);
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
            errorNotify(error.response.data.error);
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
                errorNotify("Błąd wczytywania kategorii z serwera");
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
                errorNotify("An error occurred while adding the product.");
            }
        } finally {
            setIsLoading(false);
        }
    },
    fetchSingleProduct: async (connectionUrlString, productId, successCallback, errorCallback) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/singleProduct', {
                headers: {
                    'ProductId': productId
                }
            });
            successCallback(response.data);
        } catch (error) {
            errorCallback(error.response.data.error);
        }
    },
    fetchProductsList: async (connectionUrlString, setProducts, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/productsList');
            setProducts(response.data);
        } catch (error) {
            errorNotify(error.response.data.error);
        }
    },
};

export default api;
