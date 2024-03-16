import React, {useEffect, useState} from "react";
import ProductModal from "./ProductModal";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import {useProductsData} from "../../hooks/useProductsData";
import createImageFileFromImageUrl from "../../helpers/CreateImageFileFromImageUrl";
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

    const onSubmit = async () => {
        setIsLoading(true);
        let imageFile = null;

        if (productsData.image != null)
            imageFile = await createImageFileFromImageUrl(productsData.image, productsData.name, errorNotify);
        const formData = new FormData();
        for (const key in productsData) {
            if (Object.prototype.hasOwnProperty.call(productsData, key)) {
                if (key === 'image') {
                    formData.append('image', imageFile);
                } else {
                    formData.append(key, productsData[key]);
                }
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