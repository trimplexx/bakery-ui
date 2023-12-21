import {GiConfirmed} from "react-icons/gi";
import {VscError} from "react-icons/vsc";
import CustomPagination from "./CustomPagination";
import React from "react";

const OrdersTable = ({ orders, paginationNumber, handlePageChange, currentPage }) => {
    if (orders.length === 0) {
        return (
            <div className="py-4">
                <p className="text-center text-gray-500 dark:text-gray-400 px-40 py-10 text-2xl font-bold">Brak zamówień</p>
            </div>
        );
    }

    return (
        <div className="py-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Data
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produkty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Suma
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-2 py-3">{order.formattedOrderDate}</td>
                            <td className="px-6 py-4">
                                {order.orderedProducts.map((product, idx) => (
                                    <span key={idx}>
                    {product.productName} x{product.productQuantity}
                                        {idx !== order.orderedProducts.length - 1 && ', '}
                </span>
                                ))}
                            </td>
                            <td className="px-6 py-4">{order.orderTotal} zł</td>
                            <td className="px-6 py-3">
                                <div className="flex justify-center items-center">
                                    {order.status === 2 ? <GiConfirmed className="text-green-500 text-3xl" /> :
                                        order.status === 1 ? <VscError className="text-red-500 text-3xl"  /> : null}
                                </div>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center relative bottom-0 py-4">
                <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange} initialPage={currentPage} />
            </div>
        </div>
    );
}
export  default OrdersTable;