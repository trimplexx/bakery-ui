import React, {useState, useEffect} from 'react';
import {registerLocale} from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import CustomDatePicker from "../../components/common/CustomDataPicker";
import api from "../../utils/api";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import CustomPagination from "../../components/common/CustomPagination";
import SearchInput from "../../components/common/SearchInput";

registerLocale('pl', pl);

const AdminOrders = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);

        const fetchOrdersPaginationNumber = async () => {
            await api.fetchOrdersPaginationNumber(dateOnly, setPaginationNumber, errorNotify);
        };

        const fetchOrdersList = async () => {
            await api.fetchOrdersList(currentPage - 1, dateOnly, searchTerm, setOrders, errorNotify);
        };

        fetchOrdersPaginationNumber();
        fetchOrdersList();
    }, [currentPage, searchTerm, selectedDate]);

    const handleCheckboxChange = async (orderId, newStatus) => {
        const confirmed = window.confirm("Czy na pewno chcesz oznaczyć to zamówienie jako zrealizowane?");

        if (confirmed) {
                await api.changeOrderStatus(orderId, errorNotify, successNotify);

                const updatedOrders = orders.map(order => {
                    if (order.orderId === orderId) {
                        return {
                            ...order,
                            status: newStatus
                        };
                    }
                    return order;
                });
                setOrders(updatedOrders);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        await api.fetchOrdersList(page - 1, dateOnly, setOrders, errorNotify);
    };

    const handleSearchInputChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 gap-4 pb-2">
                <div className="h-14 z-40 md:col-span-2 xl:col-span-1">
                    <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} color="white" minDate={null}/>
                </div>
                <div className="pb-2 md:col-start-4 xl:col-start-3 md:col-span-3 xl:col-span-3">
                    <SearchInput text="Wyszukaj numer telefonu..." onChange={handleSearchInputChange} />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Numer telefonu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produkty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Suma
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex justify-center">Zrealizowane
                            </div>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th className="px-6 py-4">{order.phone || 'Brak numeru'}</th>
                            <td className="px-6 py-4">
                                {order.orderedProducts.map((product, idx) => (
                                    <span key={idx}>
                    {product.productName} x{product.productQuantity}
                                        {idx !== order.orderedProducts.length - 1 && ', '}
                </span>
                                ))}
                            </td>
                            <td className="px-6 py-4">{order.orderTotal} zł</td>
                            <td className="px-6 py-4">
                                <div className="justify-center flex">
                                    <input
                                        type="checkbox"
                                        id={`complete_${index}`}
                                        className="cursor-pointer w-6 h-6 disabled:bg-green-600 disabled:cursor-not-allowed text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600"
                                        checked={order.status === 2}
                                        onChange={() => handleCheckboxChange(order.orderId, order.status === 2 ? 1 : 2)}
                                        disabled={order.status === 2}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center relative bottom-0 py-4">
                <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange} initialPage={currentPage}/>
            </div>
        </>
    );
};

export default AdminOrders;
