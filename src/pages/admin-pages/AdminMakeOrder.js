import React, {useEffect, useState} from "react";
import CustomDatePicker from "../../components/common/CustomDataPicker";
import BasicInput from "../../components/common/BasicInput";
import {FaPlus, FaTrashAlt} from "react-icons/fa";
import Select from "react-select";
import {customDropdownStyles} from "../../styles/customDropdownStyles";
import api from "../../utils/api";
import {connectionUrlString} from "../../utils/props";
import {errorNotify} from "../../helpers/ToastNotifications";

const AdminMakeOrder = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [maxProductQuantity, setMaxProductQuantity] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        const fetchProductsToSelect = async () => {
            await api.fetchProductsToSelect(connectionUrlString, setOptions, errorNotify);
        };
        fetchProductsToSelect();
        getLocalStorageItems();
    }, []);

    const getLocalStorageItems = () => {
        const existingList = localStorage.getItem('productList');

        if (existingList) {
            const productList = JSON.parse(existingList);
            setProductsList(productList);
        }
    }

    const handleAddQuantityChange = (newQuantity) => {
        if (maxProductQuantity !== null) {
            if (newQuantity > maxProductQuantity) {
                newQuantity = maxProductQuantity;
            }
        }
        setSelectedQuantity(newQuantity);
    };

    const handleEditQuantityChange = (index, newValue) => {
        if (newValue !== "0") {
            const updatedProductList = [...productsList];
            const productToUpdate = updatedProductList[index];
            productToUpdate.quantity = newValue;
            setProductsList(updatedProductList);
            localStorage.setItem('productList', JSON.stringify(updatedProductList));
        }
    };

    const addToLocalStorage = () => {
        if (selectedOption !== null && selectedQuantity !== undefined && selectedQuantity !== '' && selectedQuantity !== "0") {
            const productName = selectedOption ? selectedOption.label : '';
            const quantity = selectedQuantity || 0;
            const maxQuantity = maxProductQuantity || 0;
            const existingList = localStorage.getItem('productList');
            let productList = existingList ? JSON.parse(existingList) : [];

            // Sprawdź, czy produkt o podanej nazwie już istnieje w liście
            const existingProduct = productList.find(product => product.productName === productName);

            if (!existingProduct) {
                // Dodaj tylko jeśli produkt o podanej nazwie nie istnieje w liście
                productList.push({productName, quantity, maxQuantity});
                localStorage.setItem('productList', JSON.stringify(productList));
            } else errorNotify("Podany produkt już został wybrany!");
        }
        getLocalStorageItems();
    };

    const handleChange = (option) => {
        setSelectedOption(option);

        var isoDate = selectedDate.toISOString();
        var dateOnly = isoDate.slice(0, 10);
        const fetchMaxSelectedProductQuantity = async () => {
            await api.fetchMaximumProductQuantity(connectionUrlString, dateOnly, option.value, setMaxProductQuantity, errorNotify);
        };
        fetchMaxSelectedProductQuantity();
        if (maxProductQuantity !== null) {
            if (selectedQuantity > maxProductQuantity) {
                setSelectedQuantity(maxProductQuantity);
            }
        }
    };

    const handleDeleteFromList = (index) => {
        const updatedProductList = [...productsList];
        updatedProductList.splice(index, 1);
        setProductsList(updatedProductList);
        localStorage.setItem('productList', JSON.stringify(updatedProductList));
    };

    return (<>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="h-14 z-50">
                    <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nazwa produktu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ilość
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="py-2 whitespace-nowrap">
                            <div className="px-2">
                                <Select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    options={options}
                                    styles={customDropdownStyles}
                                    menuPortalTarget={document.body}
                                    menuPosition={"absolute"}
                                />
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            <BasicInput
                                id="quantity"
                                type="number"
                                label="Podaj ilość"
                                value={selectedQuantity}
                                onChange={(e) => handleAddQuantityChange(e.target.value)}
                            />
                        </td>
                        <td className="flex justify-center py-6">
                            <button
                                className="rounded-full bg-white p-2 hover:bg-green-200 mr-1"
                                onClick={addToLocalStorage}
                            >
                                <FaPlus className="text-green-500 text-3xl"/>
                            </button>
                        </td>
                    </tr>
                    {productsList.map((product, index) => (<tr
                            key={index}
                            className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}
                        >
                            <th scope="row" className="py-2 font-bold text-lg whitespace-nowrap">
                                <div className="px-6">
                                    {product.productName}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <BasicInput
                                    id={`quantity-${product.index}`}
                                    type="number"
                                    label="Zmień ilość"
                                    value={product.quantity}
                                    onChange={(e) => handleEditQuantityChange(index, e.target.value)}
                                />
                            </td>
                            <td className="flex justify-center py-6">
                                <button
                                    className="rounded-full bg-white p-2 hover:bg-red-200 mr-1"
                                    onClick={handleDeleteFromList}
                                >
                                    <FaTrashAlt className="text-red-500 text-3xl"/>
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end py-4">
                <button type="button"
                        className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Zamów
                </button>
                <button type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Zamów jako zrelizowane
                </button>
            </div>
        </>);
};
export default AdminMakeOrder;