import React, {useEffect, useState} from 'react';
import {registerLocale} from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import CustomDatePicker from "../../components/common/CustomDataPicker";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import CustomPagination from "../../components/common/CustomPagination";
import SearchInput from "../../components/common/SearchInput";
import apiAdmin from "../../utils/apiAdmin";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";
import LoadingComponent from "../../components/common/LoadingComponent";
import MotionButton from "../../components/common/MotionButton";
import {endOfDay, isBefore} from 'date-fns';
import apiCommon from "../../utils/apiCommon";
import {VscError} from "react-icons/vsc";

registerLocale('pl', pl);

const AdminOrders = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRealized, setIsLoadingRealized] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);

    const [isSecConfirmModalVisible, setIsSecConfirmModalVisible] = useState(false);

    const loadingElements = () => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);

        const fetchOrdersPaginationNumber = async () => {
            await apiAdmin.fetchOrdersPaginationNumber(dateOnly, setPaginationNumber, errorNotify);
        };

        const fetchOrdersList = async () => {
            await apiAdmin.fetchOrdersList(currentPage - 1, dateOnly, searchTerm, setOrders, errorNotify);
        };

        Promise.all([fetchOrdersPaginationNumber(), fetchOrdersList()]).then(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadingElements()
    }, [currentPage, searchTerm, selectedDate, newStatus]);

    useEffect(() => {
        setIsLoading(true);
        loadingElements()
    }, []);

    const handleCheckboxChange = async (orderId, newStatus) => {
        setOrderId(orderId);
        setNewStatus(newStatus);
        setIsConfirmModalVisible(true);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        await apiAdmin.fetchOrdersList(page - 1, dateOnly, setOrders, errorNotify);
    };

    const handleSearchInputChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleConfirm = async () => {
        setIsLoadingRealized(true);
        await apiAdmin.changeOrderStatus(orderId, errorNotify, successNotify).then(() => {
            const updatedOrders = orders.map(order => {
                if (order.orderId === orderId) {
                    return {
                        ...order, status: newStatus
                    };
                }
                return order;
            });
            setOrders(updatedOrders);
            setIsLoadingRealized(false);
            setIsConfirmModalVisible(false);
        });

    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
    };

    const handleCancelOrder = async (orderId) => {
        setOrderId(orderId)
        setIsSecConfirmModalVisible(true);
    };

    const handleOrderConfirm = async () => {
        setIsLoadingCancel(true);
        Promise.all([apiCommon.cancelOrder(orderId, errorNotify, successNotify)]).then(() => {
            setIsLoadingCancel(false);
            setIsSecConfirmModalVisible(false);
            loadingElements();
        });
    };

    const handleOrderCancel = () => {
        setIsSecConfirmModalVisible(false);
    };

    return (<div className="pb-16">
            {isLoading ? <LoadingComponent/> : <div>
                <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 gap-4 pb-2">
                    <div className="h-14 z-30 md:col-span-2 xl:col-span-1">
                        <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} color="white"
                                          minDate={null}/>
                    </div>
                    <div className="pb-2 md:col-start-4 xl:col-start-3 md:col-span-3 xl:col-span-3">
                        <SearchInput text="Wyszukaj numer telefonu..." onChange={handleSearchInputChange}/>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                Numer telefonu
                                </div>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                Produkty
                                </div>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                Suma
                                </div>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                    Zrealizowane
                                </div>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                    Anuluj
                                </div>

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (<tr key={index}
                                                           className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                    {order.phone || 'Brak numeru'}
                            </div>
                            </th>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                {order.orderedProducts.map((product, idx) => (<span key={idx}>
                    {product.productName} x{product.productQuantity}
                                    {idx !== order.orderedProducts.length - 1 && ', '}
                </span>))}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                    {order.orderTotal} zł
                                </div>
                                </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="justify-center flex">
                                    {order.status !== 3 ? <input
                                            type="checkbox"
                                            id={`complete_${index}`}
                                            title="Zamówienie zostało oznaczone jako zrealizowane."
                                            className="cursor-pointer w-6 h-6 disabled:bg-green-600 disabled:cursor-not-allowed text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600"
                                            checked={order.status === 2}
                                            onChange={() => handleCheckboxChange(order.orderId, order.status === 2 ? 1 : 2)}
                                            disabled={order.status === 2}
                                        /> :
                                        <VscError className="text-red-500 text-3xl cursor-not-allowed"
                                                  title="Zamówienie anulowane"/>}
                                </div>
                            </td>
                            <td className="px-1 sm:px-6 py-3">
                                <div className="flex justify-center items-center">
                                    {order.status === 2 ?
                                        <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true}
                                                      disabledText="Zamówienie zostało odebrane"></MotionButton> :
                                        order.status === 1 ?
                                            <MotionButton onClick={() => handleCancelOrder(order.orderId)}
                                                          color={isBefore(endOfDay(selectedDate), new Date()) ? "gray-400" : "red-600"}
                                                          text="Anuluj zamówienie"
                                                          disabled={isBefore(endOfDay(selectedDate), new Date())}></MotionButton> :
                                            <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true}
                                                          disabledText="Zamówienie zostało już anulowane"></MotionButton>
                                    }
                                </div>

                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
                <CustomConfirmModal
                    visible={isConfirmModalVisible}
                    message="Czy na pewno chcesz oznaczyć to zamówienie jako zrealizowane?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    isLoading={isLoadingRealized}
                />
                <CustomConfirmModal
                    visible={isSecConfirmModalVisible}
                    message={`Czy na pewno chcesz anulować podane zamówienie? Nie będzie możliwości odwrotu.`}
                    onConfirm={handleOrderConfirm}
                    onCancel={handleOrderCancel}
                    isLoading={isLoadingCancel}
                />
                <div className="w-full flex justify-center relative bottom-0 py-4">
                    <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange}
                                      initialPage={currentPage}/>
                </div>
            </div>}
        </div>

    )

}


export default AdminOrders;
