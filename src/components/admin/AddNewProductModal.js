import React, {useState} from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import ProductModal from "./ProductModal";
import {useProductsData} from "../../hooks/useProductsData";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiAdmin from "../../utils/apiAdmin";

const AddNewProductModal = ({onClose}) => {
    useCloseOnEsc(onClose);
    const [isLoading, setIsLoading] = useState(false);
    const [productsData, setProductsData] = useProductsData();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();

        for (const key in data) {
            if (Array.isArray(data[key])) {
                data[key].forEach((value, index) => {
                    formData.append(`${key}[${index}]`, value);
                });
            } else if (data[key] instanceof File) {
                formData.append(key, data[key], data[key].name);
            } else {
                formData.append(key, data[key]);
            }
        }

        await apiAdmin.addProduct(
            formData,
            successNotify,
            errorNotify,
            onClose,
            setIsLoading
        );
    }

    return (
        <ProductModal
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={onSubmit}
            productsData={productsData}
            setProductsData={setProductsData}
            text="Dodaj produkt"
        />
    )
};

export default AddNewProductModal;