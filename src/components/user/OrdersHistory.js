import React, {useEffect, useState} from "react";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiUser from "../../utils/apiUser";
import OrdersTable from "../common/OrdersHistoryTabele";
import apiCommon from "../../utils/apiCommon";
import LoadingComponent from "../common/LoadingComponent";
import CustomConfirmModal from "../common/CustomConfirmModal";

const OrdersHistory = () => {
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(true);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            const phoneNumber = decodedToken.Phone.toString();
            const getOfOrdersPagination = async () => {
                await apiUser.getOfOrdersPagination(phoneNumber, setPaginationNumber, errorNotify);
            };

            const getUserOrdersHistoryList = async () => {
                await apiUser.getUserOrdersHistoryList(currentPage - 1, phoneNumber, setOrders, errorNotify);
            };
            Promise.all([getOfOrdersPagination(), getUserOrdersHistoryList()]).then(() => {
                setIsLoading(false);
            });
        } else {
            errorNotify('Brak tokenu w localStorage');
        }
    }, [currentPage, isLoading]);

    const handleCancelOrder = async (orderId) => {
        setOrderId(orderId)
        setIsConfirmModalVisible(true);

    };

    const handleConfirm = async () => {
        setIsLoadingButton(true);

        Promise.all([apiCommon.cancelOrder(orderId, errorNotify, successNotify)]).then(() => {
            setIsLoading(false);
            setIsLoadingButton(false);
            setIsConfirmModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    return (<div>
            {isLoading ? <LoadingComponent/> : <div>
                <OrdersTable
                    orders={orders}
                    handleCancelOrder={handleCancelOrder}
                    paginationNumber={paginationNumber}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                />
                <CustomConfirmModal
                    visible={isConfirmModalVisible}
                    message={`Czy na pewno chcesz anulować podane zamówienie? Nie będzie możliwości odwrotu.`}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    isLoading={isLoadingButton}
                />
            </div>}
        </div>);

};

export default OrdersHistory;