import axios from 'axios';
import {connectionUrlString} from "./props";
import handleApiError from './apiUtils';
import axiosInstance from "./interceptor";

const apiAdmin = {
    fetchSingleUser: async (userId, setUserData, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminUser/singleUser', {
                    headers: {
                        'UserId': userId,
                        token: token
                    }
                });
                const userDataFromAPI = response.data;
                setUserData({
                    firstName: userDataFromAPI.first_name,
                    lastName: userDataFromAPI.last_name,
                    phone: userDataFromAPI.phone,
                    email: userDataFromAPI.email
                });
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductCategories: async (setOptions, categoryIds, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/productsCategories',
                {
                    headers: {
                        categoryIds: categoryIds
                    }
                });
            const categories = response.data;
            const newOptions = [...categories.map(category => ({
                value: category.categoryId,
                label: category.name
            }))];

            setOptions(newOptions);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    addProduct: async (formData, successNotify, errorNotify, onClose, setIsLoading) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.post('api/AdminProducts/addProduct', formData, {
                    headers: {
                        token: token
                    }
                });
                successNotify(response.data.message);
                onClose();
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    },
    editProduct: async (formData, productId, successNotify, errorNotify, onClose, setIsLoading) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.put('api/AdminProducts/editProduct', formData, {
                    headers: {
                        productId: productId,
                        token: token
                    }
                });
                successNotify(response.data.message);
                onClose();
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    },
    fetchSingleProduct: async (productId, setProductsData, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/singleProduct', {
                headers: {
                    'ProductId': productId
                }
            });
            setProductsData(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsList: async (offset, categories, searchTerm, setProducts, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminProducts/productsList', {
                offset: offset,
                categories: categories,
                searchTerm: searchTerm
            });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsPaginationNumber: async (searchTerm, categories, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProducts/numberOfProducts',
                {
                    headers: {
                        searchTerm: searchTerm,
                        categories: categories
                    }
                });
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    deleteProduct: async (productId, successNotify, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.delete('api/AdminProducts/deleteProduct', {
                    headers: {
                        productId: productId,
                        token: token
                    }
                });
                successNotify(response.data);
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUsersList: async (offset, searchTerm, setUsers, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.post('api/AdminUser/usersList', {
                    searchTerm: searchTerm,
                    offset: offset
                }, {
                    headers: {
                        token: token
                    }
                });
                setUsers(response.data);
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUsersPaginationNumber: async (setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminUser/numberOfUsers');
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    adminChangeUserData: async (data, setIsLoading, errorNotify, successNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.put('api/AdminUser/editUser', data,
                    {
                        headers: {
                            token: token
                        }
                    });
                localStorage.setItem("token", response.data);
                successNotify("Poprawnie zaaktualizowano dane.");
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        } finally {
            setIsLoading(false);
        }
    },
    deleteUser: async (userId, successNotify, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.delete('api/AdminUser/deleteUser', {
                    headers: {
                        userId: userId,
                        token: token
                    }
                });
                successNotify(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    getProductsQuantity: async (dateTime, setProductsList, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminProduction/productsQuantity', {
                headers: {
                    'DateTime': dateTime
                }
            });
            setProductsList(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    updateProductsAvailability: async (products, dateTime, successNotify, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.put('api/AdminProduction/updateProductsAvailability', products, {
                    headers: {
                        'DateTime': dateTime,
                        token: token
                    }
                });
                successNotify(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsToSelect: async (setOptions, errorNotify) => {
        try {
            const response = await axiosInstance.get('api/AdminOrderingPage/productsToSelect');
            const newOptions = response.data.map(products => ({
                value: products.productId,
                label: products.name
            }));
            setOptions(newOptions);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchOrdersList: async (offset, dateTime, phone, setUsers, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminOrders/ordersList', {
                    headers: {
                        offset: offset,
                        dateTime: dateTime,
                        phone: phone,
                        token: token
                    }
                });
                setUsers(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchOrdersPaginationNumber: async (dateTime, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/AdminOrders/numberOfOrders', {
                headers: {
                    dateTime: dateTime
                }
            });
            setPaginationNumber(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    changeOrderStatus: async (orderId, errorNotify, successNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.post('api/AdminOrders/changeOrderStatus', null, {
                    headers: {
                        orderId: orderId,
                        token: token
                    }
                });
                successNotify(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchLastDaysSalary: async (setLastDaysSalary, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminMainPage/lastDaysSalary',
                    {
                        headers: {
                            token: token
                        }
                    })
                setLastDaysSalary(response.data);
            }
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsLeft: async (setProductsLeft, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminMainPage/productsLeft',
                    {
                        headers: {
                            token: token
                        }
                    })
                setProductsLeft(response.data);
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchUnfulfilledOrders: async (setUnfulfilledOrders, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminMainPage/unfulfilledOrders',
                    {
                        headers: {
                            token: token
                        }
                    })
                setUnfulfilledOrders(response.data);
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchNumberOfOrders: async (setNumberOfOrders, errorNotify) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('api/AdminMainPage/numberOfOrders',
                    {
                        headers: {
                            token: token
                        }
                    })
                setNumberOfOrders(response.data);
            }

        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
}

export default apiAdmin;