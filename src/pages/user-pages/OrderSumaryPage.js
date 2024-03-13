import React, {useContext, useEffect, useRef, useState} from 'react';
import Select from "react-select";
import {customDropdownStyles} from "../../styles/customDropdownStyles";
import {IoCashOutline} from "react-icons/io5";
import ProductShoppingCard from "../../components/common/ProductsShoppingCard";
import {useOrderFunctions} from "../../hooks/useCardFunctions";
import useAuth from "../../hooks/useAuth";
import {FaLock} from "react-icons/fa";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiUser from "../../utils/apiUser";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";
import {FadeLoader} from "react-spinners";
import {ShoppingCardContext} from "../../helpers/ShoppingCardState";
import {useCleanLocalStorage} from "../../hooks/useCleanLocalStorage";

const OrderSumaryPage = () => {
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const {isCardChange} = useContext(ShoppingCardContext);
    useCleanLocalStorage();
    const phoneRef = useRef(null);
    const {
        productData,
        setProductData,
        storedDates,
        selectedOption,
        setSelectedOption,
        handleSelectChange,
        handleQuantityChange,
        handleDelete,
        calculateTotalPrice,
        isLoading
    } = useOrderFunctions();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        setIsUserLoggedIn(isLoggedIn);

        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            phoneRef.current = decodedToken.Phone;
        }

        // Wczytaj wybraną opcję z localStorage
        const storedOption = localStorage.getItem('selectedOption');

        if (storedOption) {
            const foundOption = storedDates.find(option => option.value === storedOption);
            if (foundOption) {
                handleSelectChange(foundOption);
            }
        } else {
            setSelectedOption(null);
            setProductData(null);
        }
    }, [storedDates, isCardChange]);

    const handleOrder = async () => {
        const termsChecked = document.getElementById('terms').checked;

        if (!termsChecked) {
            errorNotify('Proszę zaakceptować Regulamin oraz Politykę prywatności.');
            return;
        }

        if (!Array.isArray(productData) || productData.length === 0) {
            errorNotify('Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.');
            return;
        }

        if (!productData || productData.length === 0) {
            errorNotify('Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.');
            return;
        }

        const phoneValue = document.getElementById('phone').value;
        const phoneRegex = /^\d{9}$/;

        if (!phoneRegex.test(phoneValue)) {
            errorNotify('Numer telefonu powinien zawierać 9 cyfr.');
            return;
        }

        let phoneCheck = false;
        if (!isLoggedIn) {
            await apiUser.checkPhoneMakingOrder(phoneValue, (data) => {
                if (data) {
                    errorNotify("Numer telefonu jest już zrejestrowany jako użytkownik! Zaloguj się aby wykonać zamówienie na ten numer");
                    phoneCheck = true;
                }
            }, errorNotify);
        }
        // Sprawdzanie czy jezeli użytkownik nie jest zalogowany nie podał numeru telefonu, który jest przypisany do konta.
        if (!phoneCheck) {
            setIsConfirmModalVisible(true);
        }
    };
    const handleConfirm = async () => {
        setIsLoadingOrder(true);
        const dateTime = selectedOption;
        const productsToSend = productData.map(product => ({
            name: product.name, quantity: product.quantity,
        }));
        await apiUser.userMakeOrder(productsToSend, dateTime, 1, document.getElementById('phone').value, successNotify, errorNotify)
            .then(() => {
                setIsLoadingOrder(false);
                setIsConfirmModalVisible(false);
            })

    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
    };

    return (<div className=" h-full bg-gradient-to-b from-[#F5F5F5] via-gray-300 to-[#F5F5F5] p-5 sm:p-10 xl:p-16 2xl:p-20 flex justify-center">
        <div className="bg-gray-200 w-full max-w-8xl py-4 sm:p-10 rounded-2xl max-w-7xl">
            <div className="p-4 w-full lg:w-96">
                <Select
                    options={storedDates}
                    value={selectedOption ? storedDates.find(option => option.value === selectedOption) : null}
                    styles={customDropdownStyles}
                    onChange={handleSelectChange}
                    noOptionsMessage={() => "Brak dostępnych koszyków."}
                    placeholder="Wybierz koszyk z produktami."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 mb-4">
                {isLoading ? (<div
                        className="flex-grow items-center mx-4 h-full md:col-span-4 bg-gray-300 rounded mb-4 justify-center">
                        <div className="p-4 flex-col items-center justify-center h-full flex text-lg">
                            <FadeLoader color="#eab308"/>
                            <p className="text-yellow-400 text-2xl font-bold mt-4">Ładowanie...</p>
                        </div>
                    </div>) : <div className="overflow-y-auto max-h-[52vh] md:col-span-4">
                    {Array.isArray(productData) && productData.length > 0 ? (
                        <div className="overflow-y-auto max-h-[65vh]">
                            {productData.map((product, index) => (<ProductShoppingCard
                                key={index}
                                product={product}
                                index={index}
                                date={selectedOption}
                                handleQuantityChange={handleQuantityChange}
                                handleDelete={handleDelete}
                            />))}
                        </div>) : (<div className="flex mx-4 bg-gray-300 rounded mb-4 justify-center">
                        <div className="p-4 items-center">
                            Koszyk jest pusty wybierz date.
                        </div>
                    </div>)}
                </div>}
                <div
                    className="flex flex-col mx-2 md:mx-4 bg-gray-300 rounded mb-4 md:col-span-4 lg:col-span-2 lg:col-start-6 h-auto">
                    <div className="flex justify-center w-full">
                        <h1 className="text-lg md:text-xl font-sans font-bold p-2 md:pt-4 border-b-4 border-gray-500">Podsumowanie</h1>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-gray-500 mt-6 ">
                        <p className="col-span-2 text-lg font-sans p-4 md:pt-4">Produkty (suma): </p>
                        <div className="flex justify-end items-end">
                            <p className="text-lg font-sans p-4 md:pt-4">{calculateTotalPrice()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-b-2 border-gray-500 mt-6">
                        <p className=" text-lg font-sans p-4 md:pt-4">Data zamówienia: </p>
                        <div className="flex justify-end items-end">
                            <p className="text-lg font-sans p-4 md:pt-4">{selectedOption}</p>
                        </div>
                    </div>
                    <div className="flex px-2 my-6">
                                        <span
                                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-200 border border-gray-300 rounded">
                                            <span className="fi fi-pl mr-2"></span> +48
                                        </span>
                        <div className="relative flex-grow w-40 lg:w-auto">
                            <input
                                type="text"
                                id="phone"
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm ${isUserLoggedIn ? 'text-gray-700 opacity-50' : 'text-gray-900'} bg-transparent rounded-lg border-1 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer ${isUserLoggedIn ? 'pointer-events-none' : ''}`}
                                placeholder=" "
                                maxLength="9"
                                value={phoneRef.current}
                                disabled={isUserLoggedIn}
                            />
                            {isUserLoggedIn && (<FaLock
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>)}
                            <label
                                htmlFor="phone"
                                className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-300 px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Numer telefonu
                            </label>
                        </div>

                    </div>
                    <div className="flex items-center px-2">
                        <input id="terms" type="checkbox" value=""
                               className=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"
                               required/>
                        <label htmlFor="terms"
                               className="cursor-pointer ml-1 text-sm font-medium text-gray-900 ">*Akceptuję
                            Regulamin oraz Politykę prywatności. </label>
                        <span
                            className="cursor-pointer ml-1 text-sm font-medium text-[#fda329] hover:text-[#8b8a8a]">(Link)</span>
                    </div>
                    <div className="h-full flex justify-center my-4 items-end">
                        <div className="mt-6">
                            <button
                                type="button"
                                className="text-lg text-black bg-yellow-orange-200 hover:bg-yellow-orange-300 focus:outline-none focus:ring-4 focus:ring-yellow-orange-300 font-medium rounded-full px-5 py-2.5 flex justify-center items-center"
                                onClick={handleOrder}
                            >

                                Zamów <IoCashOutline className="text-xl ml-2"/>
                            </button>
                            <CustomConfirmModal
                                visible={isConfirmModalVisible}
                                message={`Czy na pewno chcesz złożyć podane zamówienie z obowiązkiem zapłaty oraz 
                                                    odbioru w lokalu w dniu ${localStorage.getItem('selectedOption')}.`}
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                                isLoading={isLoadingOrder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default OrderSumaryPage;
