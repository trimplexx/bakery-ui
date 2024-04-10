import React, {useEffect, useState} from "react";
import ProductModal from "./ProductModal";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import {useProductsData} from "../../hooks/useProductsData";
import apiAdmin from "../../utils/apiAdmin";
import LoadingComponent from "../common/LoadingComponent";

const EditProductModal = ({onClose, productId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [productsData, setProductData] = useProductsData();


    useEffect(() => {

        const fetchData = async () => {
            await apiAdmin.fetchSingleProduct(productId, setProductData, errorNotify);
        };

        Promise.all([fetchData()]).then(() => {
            setIsLoadingProduct(false);
        });
    }, [productId]);

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

        await apiAdmin.editProduct(
            formData,
            productId,
            successNotify,
            errorNotify,
            onClose,
            setIsLoading
        );
    }


    return (<div>
        {isLoadingProduct ? <LoadingComponent/> :
            <ProductModal
                isLoading={isLoading}
                onClose={onClose}
                onSubmit={onSubmit}
                productsData={productsData}
                setProductsData={setProductData}
                text="Edytuj produkt"
            />}
    </div>);
};

export default EditProductModal;