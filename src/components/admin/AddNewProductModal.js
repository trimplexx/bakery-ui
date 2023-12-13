import React, {useState} from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import ProductModal from "./ProductModal";
import {useProductsData} from "../../hooks/useProductsData";
import api from "../../utils/api";
import {connectionUrlString} from "../../utils/props";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";

const AddNewProductModal = ({onClose}) => {
    useCloseOnEsc(onClose);
    const [isLoading, setIsLoading] = useState(false);
    const [productsData] = useProductsData();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                formData.append(key, data[key]);
            }
        }

        await api.addProduct(
            connectionUrlString,
            formData,
            successNotify,
            errorNotify,
            onClose,
            setIsLoading
        );
    }

    return (
        <ProductModal isLoading={isLoading} onClose={onClose} onSubmit={onSubmit} productsData={productsData} text="Dodaj produkt"/>
    )
};

export default AddNewProductModal;