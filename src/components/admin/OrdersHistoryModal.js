import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import OrdersTable from "../common/OrdersHistoryTabele";
import apiUser from "../../utils/apiUser";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiCommon from "../../utils/apiCommon";
import CustomConfirmModal from "../common/CustomConfirmModal";
import LoadingComponent from "../common/LoadingComponent";

const OrdersHistoryModal = ({onClose, userId}) => {
    useCloseOnEsc(onClose);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    useEffect(() => {
        const getOfOrdersPagination = async () => {
            await apiUser.getOfOrdersPagination(userId, setPaginationNumber, setErrorMessage, setIsErrorVisible);
        };

        const getUserOrdersHistoryList = async () => {
            await apiUser.getUserOrdersHistoryList(currentPage - 1, userId, setOrders, setErrorMessage, setIsErrorVisible);
        };
        Promise.all([getOfOrdersPagination(), getUserOrdersHistoryList()]).then(() => {
            setIsLoading(false);
        });
    }, [currentPage, isLoadingButton]);


    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    const handleCancelOrder = async (orderId) => {
        setOrderId(orderId)
        setIsConfirmModalVisible(true);

    };

    const handleConfirm = async () => {
        setIsLoadingButton(true);

        Promise.all([apiCommon.cancelOrder(orderId, errorNotify, successNotify)]).then(() => {
            setIsLoadingButton(false);
            setIsConfirmModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
    };


    return (<div>
            {isLoading ? <LoadingComponent/> :
                <div className="fixed inset-0 z-50 ">
                    <AnimatedModal onClose={onClose}>
                        <div className="mt-4 px-1 pt-4 lg:pt-7 bg-white rounded-2xl min-h-[85vh] max-h-[85vh] sm:max-h-none overflow-y-auto sm:min-w-[60vh]">
                                <OrdersTable
                                    orders={orders}
                                    paginationNumber={paginationNumber}
                                    isErrorVisible={isErrorVisible}
                                    errorMessage={errorMessage}
                                    handlePageChange={handlePageChange}
                                    handleCancelOrder={handleCancelOrder}
                                    currentPage={currentPage}
                                />
                            <CustomConfirmModal
                                visible={isConfirmModalVisible}
                                message={`Czy na pewno chcesz anulować podane zamówienie? Nie będzie możliwości odwrotu.`}
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                                isLoading={isLoadingButton}
                            />
                        </div>
                    </AnimatedModal>
                </div>}
        </div>
    );
};

export default OrdersHistoryModal;