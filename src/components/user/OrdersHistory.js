import React, {useEffect, useState} from "react";
import {errorNotify} from "../../helpers/ToastNotifications";
import CustomPagination from "../common/CustomPagination";
import apiUser from "../../utils/apiUser";
import { GiConfirmed } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
import OrdersTable from "../common/OrdersHistoryTabele";

const OrdersHistory = () => {
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
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
                await apiUser.getUserOrdersHistoryList(currentPage-1, phoneNumber, setOrders, errorNotify);
            };

            getOfOrdersPagination();
            getUserOrdersHistoryList();
        } else {
            console.error('Brak tokenu w localStorage');
        }
    }, [currentPage]);


    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <OrdersTable
                orders={orders}
                paginationNumber={paginationNumber}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

export default OrdersHistory;