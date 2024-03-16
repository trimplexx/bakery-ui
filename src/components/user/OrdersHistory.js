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
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            const userId = decodedToken.UserId.toString();

            const getOfOrdersPagination = async () => {
                await apiUser.getOfOrdersPagination(userId, setPaginationNumber, setErrorMessage, setIsErrorVisible);
            };


            const getUserOrdersHistoryList = async () => {
                await apiUser.getUserOrdersHistoryList(currentPage - 1, userId, setOrders, setErrorMessage, setIsErrorVisible);
            };
            Promise.all([getOfOrdersPagination(), getUserOrdersHistoryList()]).then(() => {
                setIsLoading(false);
            });

        } else {
            errorNotify('Brak tokenu w localStorage');
        }
    }, [currentPage,isLoadingButton]);

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

    const handleErrorClose = () => {
        setIsErrorVisible(false);
    };

    return (<div>
            {isLoading ? <LoadingComponent/> : <div className="min-h-[450px]">
                <OrdersTable
                    orders={orders}
                    handleCancelOrder={handleCancelOrder}
                    paginationNumber={paginationNumber}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    isErrorVisible={isErrorVisible}
                    errorMessage={errorMessage}
                    handleErrorClose={handleErrorClose}
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