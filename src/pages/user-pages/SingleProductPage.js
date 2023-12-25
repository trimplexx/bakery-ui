import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { errorNotify } from '../../helpers/ToastNotifications';
import { useProductsData } from '../../hooks/useProductsData';
import CustomDatePicker from "../../components/common/CustomDataPicker";
import {FaShoppingCart} from "react-icons/fa";
import AnimatedIconButton from "../../components/common/AnimatedIconButton";
import apiAdmin from "../../utils/apiAdmin";
import apiCommon from "../../utils/apiCommon";

const SingleProductPage = () => {
    const { productId } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [productData, setProductData] = useProductsData();
    const [quantity, setQuantity] = useState(1);
    const [maxProductQuantity, setMaxProductQuantity] = useState();


    useEffect(() => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0,10);
        const fetchData = async () => {
            await apiAdmin.fetchSingleProduct(productId, setProductData, errorNotify);
        };
        fetchData();

        const fetchMaxSelectedProductQuantity = async () => {
            await apiCommon.fetchMaximumProductQuantity(dateOnly, productId, setMaxProductQuantity, errorNotify);
        };
        fetchMaxSelectedProductQuantity();
        if (maxProductQuantity === 0) {
            setQuantity(0);
        }

    }, [maxProductQuantity, productId, selectedDate, setProductData]);

    const handleQuantityChange = (event) => {
        const inputValue = event.target.value;
        const newValue = inputValue !== '' ? parseInt(inputValue) : 0;
        setQuantity(handleQuantityLimit(newValue));
    };

    const handleQuantityLimit = (value) => {
        if (value > maxProductQuantity) {
            return maxProductQuantity;
        }
        return value;
    };

    const handleAddToCart = () => {
        if (quantity !== 0) {
            const isoDate = selectedDate.toISOString();
            const dateOnly = isoDate.slice(0, 10);
            const cartKey = `${dateOnly}`;

            let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

            const existingProduct = cartItems.find(item => item.name === productData.name);

            if (existingProduct) {
                existingProduct.quantity = quantity;
            } else {
                cartItems.push({
                    name: productData.name,
                    quantity: quantity,
                });
            }

            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }
    };

    return (
        <div className="h-auto bg-gradient-to-b from-[#F5F5F5] via-gray-300 to-[#F5F5F5] p-10 px-10 xl:px-24 2xl:px-40 justify-center flex">
            {productData && (
                <div className="bg-gray-200 w-full max-w-8xl p-6 rounded-2xl">
                    <div className="grid lg:grid-cols-2 gap-5 mb-4">
                        <img className="rounded-lg shadow-xl" src={productData.image} alt="image description" />
                        <div>
                            <h1 className="text-4xl font-semibold mb-4">{productData.name}</h1>
                            <p className="text-lg mb-6"><strong>Cena: </strong>{productData.price} zł</p>
                            <p className="text-lg text-gray-700 mb-6">{productData.description}</p>
                            <div className="grid lg:grid-cols-2">
                                <div className="h-12 z-20 my-2">
                                    <CustomDatePicker minDate={new Date()}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        color="gray-200"
                                        text="Data zamówienia"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <input type="number" id="salt" step="1" min="0"  aria-describedby="helper-text-explanation" max={maxProductQuantity}  value={quantity}
                                           onChange={handleQuantityChange} 
                                           className=" w-16 h-12 z-20 bg-transparent my-2 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block p-2" placeholder="ilość" required/>
                                    <AnimatedIconButton
                                        Icon={FaShoppingCart}
                                        color="ml-2 text-gray-600 hover:text-green-500 text-3xl"
                                        handleIconClick={handleAddToCart}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 ">
                        <div className="grid grid-cols-2 mb-6 lg:mb-0">
                            <p className="text-lg text-gray-700 border-b-4 border-gray-700" ><strong>Masa produktu</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg mr-8 text-gray-700 border-b-4 border-gray-700"><strong>{productData.weight}g</strong></p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-lg text-gray-700 border-b-4 border-gray-700"><strong>Wartości odżywcze produktu w 100g</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg mr-8 text-gray-700 border-b-4 border-gray-700"><strong>Ilość</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 mt-4 lg:mt-6">
                        <div className="grid grid-cols-2 gap-4 col-start-2">
                            <p className="text-lg font-light"><strong>Wartość energetyczna (kJ/kcal)</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.kj} / {productData.kcal}</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>Tłuszcze</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.fat} g</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>W tym tłuszcze nasycone</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.saturatedFat} g</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>Węglowodany</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.carbohydrates} g</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>Cukry</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.sugars} g</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>Białko</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.proteins} g</strong></p>
                            </div>
                            <p className="text-lg font-light"><strong>Sól</strong></p>
                            <div className="justify-end flex">
                                <p className="text-lg font-light mr-8"><strong>{productData.salt} g</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProductPage;
