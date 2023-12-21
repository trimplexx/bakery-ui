import axios from 'axios';
import {connectionUrlString} from "./props";
import {successNotifyStorage} from "../helpers/ToastNotifications";

function handleApiError(error, errorNotify) {
    if (error.response && error.response.data && error.response.data.error) {
        errorNotify(error.response.data.error);
    } else {
        errorNotify('Błąd połączenia serwera');
    }
}

const apiUser = {
    fetchUserProductsList: async ( dateTime, offset, category, searchTerm, setProducts, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/Products/getProductsList', {
                offset: offset,
                category: category,
                searchTerm: searchTerm
            },
                {
                    headers: {
                        dateTime: dateTime
                    }
                });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    fetchProductsAvailability: async (dateTime, data, setProductsAvailability, errorNotify) => {
        try {

            const response = await axios.post(connectionUrlString + 'api/Products/getSingleProduct', data,{
                headers: {
                    dateTime: dateTime
                }
            });

            setProductsAvailability(response.data);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    userMakeOrder: async (products, dateTime, status, phone, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/AdminMakingOrder/makeOrder', products, {
                headers: {
                    dateTime: dateTime,
                    status: status,
                    phone: phone
                }
            });
            localStorage.removeItem(dateTime);
            localStorage.setItem('successNotifyStorage', response.data);
            window.location.reload(true);
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    userChangePassword: async (data, setIsLoading, successNotify, errorNotify) => {
        try {
            const response = await axios.post(connectionUrlString + 'api/User/changePassword', data);
            successNotify(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
        finally{
            setIsLoading(false);
        }
    },
    getOfOrdersPagination: async (phone, setPaginationNumber, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/User/getNumberOfOrders',{
                headers: {
                    phone : phone
                }
            } );
            setPaginationNumber(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },
    getUserOrdersHistoryList: async (offset, phone, setOrders, errorNotify) => {
        try {
            const response = await axios.get(connectionUrlString + 'api/User/getUserOrdersHistoryList', {
                headers: {
                    offset: offset,
                    phone: phone
                }
            });
            setOrders(response.data)
        } catch (error) {
            handleApiError(error, errorNotify);
        }
    },

}

export default apiUser;
