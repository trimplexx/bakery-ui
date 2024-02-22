import { useProductsData } from "./useProductsData";
import {useEffect, useState} from "react";
import apiUser from "../utils/apiUser";
import {errorNotify} from "../helpers/ToastNotifications";

export const useOrderFunctions = () => {
    const [productData, setProductData] = useProductsData();
    const [storedDates, setStoredDates] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        const loadStoredDates = () => {
            const storedKeys = Object.keys(localStorage);
            const dateKeys = storedKeys.filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
            setStoredDates(dateKeys.map(key => ({ value: key, label: key })));
        };

        loadStoredDates();

    }, [JSON.stringify(localStorage), setProductData]);


    const handleSelectChange = async (selectedOption) => {
        setSelectedOption(selectedOption.value);
        const selectedDate = selectedOption.value;

        // Zapisz wybraną opcję do localStorage
        localStorage.setItem('selectedOption', selectedOption.value);

        const selectedProductData = JSON.parse(localStorage.getItem(selectedDate));

        if (selectedProductData) {
            setProductData(selectedProductData);
        }
        const productsInfo = selectedProductData.map(product => ({
            name: product.name,
            quantity: product.quantity
        }));

        await apiUser.fetchProductsAvailability(selectedDate, productsInfo, setProductData, errorNotify);
    };


    const handleQuantityChange = (e, index, date) => {
        const newQuantity = parseInt(e.target.value, 10);
        const maxQuantity = productData[index].maxAvailableQuantity;

        let updatedQuantity = newQuantity;
        if (newQuantity > maxQuantity) {
            updatedQuantity = maxQuantity;
        }

        const updatedProductData = [...productData];
        updatedProductData[index] = { ...updatedProductData[index], quantity: updatedQuantity };

        setProductData(updatedProductData);

        // Sprawdzenie, czy index mieści się w zakresie storedDates
        if (index >= 0 && index < storedDates.length) {
            const cartKey = date;
            let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

            const existingProductIndex = cartItems.findIndex(item => item.name === updatedProductData[index].name);

            if (existingProductIndex !== -1) {
                cartItems[existingProductIndex].quantity = updatedQuantity; // Zaktualizowano na updatedQuantity
            } else {
                cartItems.push({
                    name: updatedProductData[index].name,
                    quantity: updatedQuantity, // Zaktualizowano na updatedQuantity
                });
            }
            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }
    };

    const handleDelete = (indexToDelete,date) => {
        const cartKey = date;
        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Usunięcie produktu z localStorage na podstawie indexToDelete
        cartItems.splice(indexToDelete, 1);

        if (cartItems.length === 0) {
            // Jeśli koszyk jest pusty, usuń powiązane pole z localStorage
            localStorage.removeItem(cartKey);
            localStorage.removeItem("selectedOption");
            const updatedStoredDates = [...storedDates];
            updatedStoredDates.splice(indexToDelete, 1);
            setStoredDates(updatedStoredDates);

            // Ustawienie selectedOption na wartość domyślną
            setSelectedOption(null); // lub inna wartość domyślna
        } else {
            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }

        // Aktualizacja stanu produktData po usunięciu produktu
        const updatedProductData = productData.filter((_, index) => index !== indexToDelete);
        setProductData(updatedProductData);
    };



    const calculateTotalPrice = () => {
        if (!productData || !Array.isArray(productData) || productData.length === 0) {
            return 0;
        }

        const total = productData.reduce((accumulator, product) => {
            const productPrice = parseFloat(product.price);
            const productQuantity = parseInt(product.quantity, 10);
            return accumulator + (productPrice * productQuantity);
        }, 0);

        return total.toFixed(2); // Zaokrąglanie do dwóch miejsc po przecinku
    };

    return {
        productData,
        setProductData,
        storedDates,
        setStoredDates,
        selectedOption,
        setSelectedOption,
        handleSelectChange,
        handleQuantityChange,
        handleDelete,
        calculateTotalPrice,
    };
};
