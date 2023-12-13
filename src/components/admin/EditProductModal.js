import React, {useEffect, useState} from "react";

import ProductModal from "./ProductModal";
import api from "../../utils/api";
import {connectionUrlString} from "../../utils/props";
import {errorNotify} from "../../helpers/ToastNotifications";
import {useProductsData} from "../../hooks/useProductsData";

const EditProductModal = ({onClose, productId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productsData, setProductData] = useProductsData();


    useEffect(() => {
        const fetchData = async () => {
            await api.fetchSingleProduct(connectionUrlString, productId, setProductData, errorNotify);
        };
        fetchData();
    }, [productId, setProductData]);

    const onSubmit = async (event) => {
        event.preventDefault();
    }

    return (<>
            <ProductModal
                isLoading={isLoading}
                onClose={onClose}
                onSubmit={onSubmit}
                productsData={productsData}
                text="Edytuj produkt"
            />
        </>);
};

export default EditProductModal;