import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import OrdersTable from "../common/OrdersHistoryTabele";
import apiUser from "../../utils/apiUser";
import {errorNotify} from "../../helpers/ToastNotifications";

const OrdersHistoryModal = ({onClose, phone}) => {
    useCloseOnEsc(onClose);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const formatedPhone = phone.slice(3);
        console.log(formatedPhone);
            const getOfOrdersPagination = async () => {
                await apiUser.getOfOrdersPagination(formatedPhone, setPaginationNumber, errorNotify);
            };

            const getUserOrdersHistoryList = async () => {
                await apiUser.getUserOrdersHistoryList(currentPage-1, formatedPhone, setOrders, errorNotify);
            };

            getOfOrdersPagination();
            getUserOrdersHistoryList();

    }, [currentPage]);


    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="fixed inset-0 z-50">
            <AnimatedModal onClose={onClose}>
                <div className="p-6 bg-white rounded-2xl">
                    <OrdersTable
                        orders={orders}
                        paginationNumber={paginationNumber}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>

            </AnimatedModal>
        </div>
    );
};

export default OrdersHistoryModal;