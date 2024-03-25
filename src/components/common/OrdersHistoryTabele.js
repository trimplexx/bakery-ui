import {GiConfirmed} from "react-icons/gi";
import {VscError} from "react-icons/vsc";
import {LuTimerReset} from "react-icons/lu";
import CustomPagination from "./CustomPagination";
import React from "react";
import MotionButton from "./MotionButton";
import {endOfDay, isBefore, isToday, parse} from "date-fns";
import {BsCalendar2DateFill} from "react-icons/bs";
import {CustomAlert} from "./CustomAlert";

const OrdersTable = ({
                         orders,
                         paginationNumber,
                         handlePageChange,
                         currentPage,
                         handleCancelOrder,
                         isErrorVisible,
                         errorMessage,
                         handleErrorClose
                     }) => {

    if (orders.length === 0) {
        return (<div className="py-4">
            {isErrorVisible ? <CustomAlert isVisible={isErrorVisible} type="error" info={errorMessage}
                                           handleClose={handleErrorClose}/> : null}
            <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-2xl font-bold">Brak
                zamówień</p>
        </div>);
    }

    return (<div className="p-2 sm:mx-4 max-w-screen-lg ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3">
                        Data
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3">
                        Produkty
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3">
                        Suma
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3">
                        <div className="flex justify-center">Status</div>

                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3">
                        <div className="flex justify-center">Anuluj</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (<tr key={index}
                                                   className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-1 sm:px-6 py-3">{order.formattedOrderDate}</td>
                    <td className="px-1 sm:px-6 py-3">
                        {order.orderedProducts.map((product, idx) => (<span key={idx}>
                    {product.productName} x{product.productQuantity}
                            {idx !== order.orderedProducts.length - 1 && ', '}
                </span>))}
                    </td>
                    <td className="px-1 sm:px-6 py-3">{order.orderTotal} zł</td>
                    <td className="px-1 sm:px-6 py-3">
                        <div className="flex justify-center items-center">
                            {order.status === 2 ? <GiConfirmed className="text-green-500 text-3xl"
                                                               title="Zamówienie zrealizowane"/> :
                                order.status === 1 ?
                                    isBefore(endOfDay(parse(order.formattedOrderDate, 'dd-MM-yyyy', new Date())), new Date()) ?
                                        <BsCalendar2DateFill className="text-red-500 text-3xl"
                                                             title="Zamówienie przedawnione"/> :
                                        <LuTimerReset className="text-yellow-400 text-3xl"
                                                      title="Zamówienie oczekujące na odebranie"/> :
                                    <VscError className="text-red-500 text-3xl" title="Zamówienie anulowane"/>}
                        </div>
                    </td>
                    <td className="px-1 sm:px-6 py-3">
                        <div className="flex justify-center items-center">
                            {order.status === 2 ?
                                <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true}
                                              disabledText="Zamówienie zostało odebrane"></MotionButton> :
                                order.status === 1 ?
                                    (isBefore(endOfDay(parse(order.formattedOrderDate, 'dd-MM-yyyy', new Date())), new Date())
                                        || (isToday(parse(order.formattedOrderDate, 'dd-MM-yyyy', new Date())) && new Date().getHours() >= 17)) ?
                                        <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true} disabledText="Zamówienie jest przedawnione"></MotionButton>
                                        : (isToday(new Date(order.formattedOrderDate)) && (
                                            (new Date().getHours() > 15 && new Date().getDay() !== 6) ||
                                            (new Date().getDay() === 6 && new Date().getHours() > 12)
                                        )) ?
                                            <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true} disabledText="Zamówienia nie można anulować na 2h przed zamknięciem lokalu"></MotionButton>
                                            : <MotionButton onClick={() => handleCancelOrder(order.orderId)} color="red-600" text="Anuluj zamówienie"></MotionButton>
                                    : <MotionButton color="gray-400" text="Anuluj zamówienie" disabled={true} disabledText="Zamówienie zostało już anulowane"></MotionButton>}
                        </div>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>

        <div className="w-full flex justify-center relative bottom-0">
            <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange}
                              initialPage={currentPage}/>
        </div>
    </div>);
}
export default OrdersTable;