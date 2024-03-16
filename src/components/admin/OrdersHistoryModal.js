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

    useEffect(() => {
        const getOfOrdersPagination = async () => {
            await apiUser.getOfOrdersPagination(userId, setPaginationNumber, errorNotify);
        };

        const getUserOrdersHistoryList = async () => {
            await apiUser.getUserOrdersHistoryList(currentPage - 1, userId, setOrders, errorNotify);
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
                <div className="fixed inset-0 z-50">
                    <AnimatedModal onClose={onClose}>
                        <div className="p-6 bg-white rounded-2xl">
                            <OrdersTable
                                orders={orders}
                                paginationNumber={paginationNumber}
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