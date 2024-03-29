import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import BasicInput from "../../components/common/BasicInput";
import CustomDatePicker from "../../components/common/CustomDataPicker";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiAdmin from "../../utils/apiAdmin";

import MotionButton from "../../components/common/MotionButton";

const AdminProduction = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [secSelectedDate, secSetSelectedDate] = useState(new Date());
    const [productsList, setProductsList] = useState([]);
    const [, setProductsToCopy] = useState([]);
    const [, setIsLoading] = useState(true);
    const [isLoadingCopy, setIsLoadingCopy] = useState(false);
    const [isLoadingSave, setIsLoadingSave] = useState(false);

    const handleQuantityChange = (productId, newQuantity) => {
        setProductsList(prevProducts =>
            prevProducts.map(product =>
                product.productId === productId
                    ? {...product, quantity: newQuantity}
                    : product
            )
        );
    };
    const loadingElements = () => {
        var isoDate = selectedDate.toISOString();
        var dateOnly = isoDate.slice(0, 10);
        setProductsToCopy(null);
        const getProductsQuantity = async () => {
            await apiAdmin.getProductsQuantity(dateOnly, setProductsList, errorNotify);
        };

        getProductsQuantity().then(r => setIsLoading(false));
    }

    useEffect(() => {
        setIsLoading(true);
        loadingElements();
    }, []);

    useEffect(() => {
        loadingElements();
    }, [selectedDate]);

    const copyFromThisDate = () => {
        setIsLoadingCopy(true);
        let isoDate = secSelectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        let orderedQuantities = [];

        const getProductsQuantity = async () => {
            await apiAdmin.getProductsQuantity(dateOnly, setProductsToCopy, errorNotify);
        };

        const setProductsToCopy = (products) => {
            productsList.forEach(product => {
                orderedQuantities.push(product.orderedQuantity);
            });

            const updatedProducts = products.map((product, index) => ({
                ...product,
                orderedQuantity: orderedQuantities[index]
            }));
            setProductsList(updatedProducts);
        };

        getProductsQuantity().then(() => {
            setIsLoadingCopy(false);
        });
    };

    const SaveChanges = async () => {
        setIsLoadingSave(true);
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        await apiAdmin.updateProductsAvailability(productsList, dateOnly, successNotify, errorNotify).then(() => {
            setIsLoadingSave(false);
        });
    };
    return (
                <div className="pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="h-14 z-30">
                            <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                                              color="white" minDate={new Date()}/>
                        </div>
                        <div className="lg:col-start-3 h-14 z-20">
                            <CustomDatePicker selectedDate={secSelectedDate} setSelectedDate={secSetSelectedDate}
                                              color="white" minDate={null}/>
                        </div>
                        <MotionButton
                            text="Skopiuj z wybranego dnia"
                            color="yellow-400"
                            onClick={copyFromThisDate}
                            isLoading={isLoadingCopy}
                        />

                        <MotionButton
                            text="Zapisz wybrany dzień"
                            color="green-600"
                            onClick={SaveChanges}
                            isLoading={isLoadingSave}
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nazwa produktu
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3">
                                    Ilość na dzień
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 flex">
                                    <div className="flex justify-end items-end w-full mr-4">
                                        Zamówiona ilość
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {productsList &&
                                productsList.map((product) => (
                                    <tr key={product.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="py-2 font-bold text-lg whitespace-nowrap">
                                            <div className="px-2 sm:px-6 text-sm sm:text-base">
                                                {product.name}
                                            </div>
                                        </th>
                                        <td className="sm:px-6 py-4 w-40 sm:w-60">
                                            <BasicInput
                                                id={`quantity-${product.productId}`}
                                                type="number"
                                                label="Podaj ilość"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                                                maxLength="40"
                                            />
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 text-lg font-bold pr-4">
                                            <div className="px-2 sm:px-6 flex justify-end items-end w-full ">
                                                {product.orderedQuantity}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
        </div>
    );
};

export default AdminProduction;