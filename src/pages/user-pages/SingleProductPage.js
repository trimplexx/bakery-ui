import {useNavigate, useParams} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {errorNotify, successNotify} from '../../helpers/ToastNotifications';
import {useProductsData} from '../../hooks/useProductsData';
import CustomDatePicker from "../../components/common/CustomDataPicker";
import {FaShoppingCart} from "react-icons/fa";
import AnimatedIconButton from "../../components/common/AnimatedIconButton";
import apiCommon from "../../utils/apiCommon";
import axios from "axios";
import {connectionUrlString, notFoundImage} from "../../utils/props";
import handleApiError from "../../utils/apiUtils";
import apiUser from "../../utils/apiUser";
import {LocalStorageCheck} from "../../helpers/LocalStorageCheck";
import {CustomAlert} from "../../components/common/CustomAlert";
import useMinDate from "../../hooks/useMinDate";
import {ShoppingCardContext} from "../../helpers/ShoppingCardState";

const SingleProductPage = () => {
    const {productId} = useParams();
    const [productQuantityInfo, setQuantityProductInfo] = useState();
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const {setIsCardChange, isCardChange} = useContext(ShoppingCardContext);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [productData, setProductData] = useProductsData();
    const [quantity, setQuantity] = useState(1);
    const [maxProductQuantity, setMaxProductQuantity] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [productCategories, setProductCategories] = useState([]);
    const navigate = useNavigate();
    const minDate = useMinDate();


    const loadingElements = () => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        const fetchData = async () => {
            try {
                const response = await axios.get(connectionUrlString + 'api/AdminProducts/singleProduct', {
                    headers: {
                        'ProductId': productId
                    }
                });
                setProductData(response.data);
                await apiUser.fetchProductCategories(setProductCategories, response.data.categories, errorNotify);
            } catch (error) {
                handleApiError(error, errorNotify);
                navigate("/");
            }
        };

        const fetchMaxSelectedProductQuantity = async () => {
            await apiCommon.fetchMaximumProductQuantity(dateOnly, productId, setMaxProductQuantity, setQuantityProductInfo, setIsErrorVisible, setIsInfoVisible);
        };
        if (maxProductQuantity === 0) {
            setQuantity(0);
        }

        Promise.all([fetchData(), fetchMaxSelectedProductQuantity()]).then(() => {
            setIsLoading(false);
        });
    }
    useEffect(() => {
        LocalStorageCheck();
        setIsLoading(true);
        loadingElements();
    }, []);

    useEffect(() => {
        loadingElements();
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
                    name: productData.name, quantity: quantity,
                });
            }
            const storedOption = localStorage.getItem('selectedOption');
            if (storedOption === null) {
                let isoDate = selectedDate.toISOString();
                let dateOnly = isoDate.slice(0, 10);
                localStorage.setItem("selectedOption", dateOnly);
            }

            localStorage.setItem(cartKey, JSON.stringify(cartItems));
            if (isCardChange === false)
                setIsCardChange(true)
            else
                setIsCardChange(false)
            successNotify("Pomyślnie dodano do koszyka.")
        }
    };

    const handleErrorClose = () => {
        setIsErrorVisible(false);
    };
    const handleInfoClose = () => {
        setIsInfoVisible(false);
    };

    return (<div
        className="h-auto bg-gradient-to-b from-[#F5F5F5] via-gray-300 to-[#F5F5F5] sm:p-10 p-2 sm:px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">
    <div> {productData && (<div className="bg-gray-200 w-full max-w-8xl p-2 sm:p-6 rounded-2xl">
                <div className="grid lg:grid-cols-2 gap-5 mb-4">
                    {productData.image ?
                        <div className="w-full justify-center items-center flex"> <img className="rounded-lg shadow-xl" src={productData.image} alt="image description"/> </div>:
                        <div className="w-full justify-center items-center flex"> <img className="rounded-lg shadow-xl" src={notFoundImage} alt="image description"/> </div>}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-semibold mb-4">{productData.name}</h1>
                        <p className="text-lg"><strong>Cena: </strong>{productData.price} zł</p>
                        <div className="flex flex-wrap my-4">
                            {Object.keys(productCategories).map(category => (
                                <span key={category}
                                      className="border-2 border-gray-400 rounded-full px-4 py-2 m-1">{category}</span>
                            ))}
                        </div>
                        <p className="text-lg text-gray-700 mb-6">{productData.description}</p>

                        <div className="sm:grid sm:grid-cols-2 mt-auto">
                            <div className="col-span-2 w-full">
                                {isErrorVisible && !isInfoVisible ?
                                    <CustomAlert isVisible={isErrorVisible} type="error" info={productQuantityInfo}
                                                 handleClose={handleErrorClose}/>
                                    : null}
                                {isInfoVisible && !isErrorVisible ?
                                    <CustomAlert isVisible={isInfoVisible} type="info" info={productQuantityInfo}
                                                 handleClose={handleInfoClose}/>
                                    : null}
                            </div>
                            <div className="h-12 z-20 my-2 flex justify-center sm:justify-start ">
                                <CustomDatePicker minDate={minDate()}
                                                  selectedDate={selectedDate}
                                                  setSelectedDate={setSelectedDate}
                                                  color="gray-200"
                                                  text="Data zamówienia"
                                />
                            </div>
                            <div className="flex sm:justify-end  justify-center w-full">
                                <input type="number" id="salt" step="1" min="0"
                                       aria-describedby="helper-text-explanation" max={maxProductQuantity}
                                       value={quantity}
                                       onChange={handleQuantityChange}
                                       className=" w-16 h-12 z-20 bg-transparent my-2 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block p-2"
                                       placeholder="ilość" required/>
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
                        <p className="text-lg text-gray-700 border-b-4 border-gray-700"><strong>Masa
                            produktu</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg mr-8 text-gray-700 border-b-4 border-gray-700">
                                <strong>{productData.weight}g</strong></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="text-lg text-gray-700 border-b-4 border-gray-700"><strong>Wartości
                            odżywcze produktu w 100g</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg mr-8 text-gray-700 border-b-4 border-gray-700">
                                <strong>Ilość</strong></p>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 mt-4 lg:mt-6">
                    <div className="grid grid-cols-2 gap-4 col-start-2">
                        <p className="text-lg font-light"><strong>Wartość energetyczna (kJ/kcal)</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg font-light mr-8">
                                <strong>{productData.kj} / {productData.kcal}</strong></p>
                        </div>
                        <p className="text-lg font-light"><strong>Tłuszcze</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg font-light mr-8"><strong>{productData.fat} g</strong></p>
                        </div>
                        <p className="text-lg font-light"><strong>W tym tłuszcze nasycone</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg font-light mr-8"><strong>{productData.saturatedFat} g</strong>
                            </p>
                        </div>
                        <p className="text-lg font-light"><strong>Węglowodany</strong></p>
                        <div className="justify-end flex">
                            <p className="text-lg font-light mr-8">
                                <strong>{productData.carbohydrates} g</strong></p>
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
    </div>)}
        </div>
    </div>);
};

export default SingleProductPage;
