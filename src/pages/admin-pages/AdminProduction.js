import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import BasicInput from "../../components/common/BasicInput";
import CustomDatePicker from "../../components/common/CustomDataPicker";
import api from "../../utils/api";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";

const AdminProduction = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [secSelectedDate, secSetSelectedDate] = useState(new Date());
    const [productsList, setProductsList] = useState([]);
    const [productsToCopy, setProductsToCopy] = useState([]);

    const handleQuantityChange = (productId, newQuantity) => {
        setProductsList(prevProducts =>
            prevProducts.map(product =>
                product.productId === productId
                    ? {...product, quantity: newQuantity}
                    : product
            )
        );
    };

    useEffect(() => {
        var isoDate = selectedDate.toISOString();
        var dateOnly = isoDate.slice(0,10);
        setProductsToCopy(null);
        const getProductsQuantity = async () => {
            await api.getProductsQuantity(dateOnly, setProductsList,errorNotify);
        };

        getProductsQuantity();
    }, [selectedDate]);

    const copyFromThisDate = () => {
        let isoDate = secSelectedDate.toISOString();
        let dateOnly = isoDate.slice(0,10);

        const getProductsQuantity = async () => {
            await api.getProductsQuantity(dateOnly, setProductsToCopy,errorNotify);
        };
        const setProductsToCopy = (products) => {
            const updatedProducts = products.map(product => ({
                ...product,
                orderedQuantity: 0,
            }));

            setProductsList(updatedProducts);
        };
        getProductsQuantity();
    };

    const SaveChanges = async () => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        await api.updateProductsAvailability(productsList, dateOnly, successNotify, errorNotify);
    };

    return(
    <>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="h-14 z-40">
                <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} color="white" minDate={new Date()}/>
            </div>
            <div className="lg:col-start-3 h-14 z-10">
                <CustomDatePicker selectedDate={secSelectedDate} setSelectedDate={secSetSelectedDate} color="white" minDate={null}/>
            </div>
            <button type="button" onClick={copyFromThisDate} className=" w-full h-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Skopiuj z wybranego dnia</button>
            <button type="button" onClick={SaveChanges} className="h-full w-full focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Zapisz wybrany dzień</button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr >
                    <th scope="col" className="px-6 py-3">
                        Nazwa produktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Ilość na dzień
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Zamówiona ilość
                    </th>
                </tr>
                </thead>
                <tbody>
                {productsList &&
                    productsList.map((product) => (
                        <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="py-2 font-bold text-lg whitespace-nowrap">
                                <div className="px-6">
                                    {product.name}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <BasicInput
                                    id={`quantity-${product.productId}`}
                                    type="number"
                                    label="Podaj ilość"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                                    maxLength="40"
                                />
                            </td>
                            <td className="px-6 py-4 text-lg font-bold">
                                <div className="px-10">
                                    {product.orderedQuantity}
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
            </>
        );
};

export default AdminProduction;