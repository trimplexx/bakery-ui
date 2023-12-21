import { useState } from 'react';

export const useProductsData = () => {
    const initialProductsData = {
        name: '',
        price: '',
        weight: '',
        image: null,
        selectedOption: null,
        kj: '',
        kcal: '',
        fat: '',
        saturatedFat: '',
        carbohydrates: '',
        sugars: '',
        proteins: '',
        salt: '',
        quantity: null,
    };

    const [productsData, setProductsData] = useState(initialProductsData);
    return [productsData, setProductsData];
};
