import React, {useContext, useEffect, useState} from "react";
import CustomDatePicker from "../../components/common/CustomDataPicker";
import {FaSearch, FaShoppingCart} from "react-icons/fa";
import {TbCategory} from "react-icons/tb";
import ProductsCategories from "../../components/user/ProductsCategories";
import AnimatedIconButton from "../../components/common/AnimatedIconButton";
import AnimatedSearchInput from "../../components/common/AnimatedSearchInput";
import {notFoundImage} from "../../utils/props";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {FcCancel} from "react-icons/fc";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiUser from "../../utils/apiUser";
import CustomPagination from "../../components/common/CustomPagination";
import {motion} from "framer-motion";
import {Link} from 'react-router-dom';
import {Fade} from "react-reveal";
import apiAdmin from "../../utils/apiAdmin";
import apiCommon from "../../utils/apiCommon";
import LoadingComponent from "../../components/common/LoadingComponent";
import {LocalStorageCheck} from "../../helpers/LocalStorageCheck";
import useMinDate from "../../hooks/useMinDate";
import {ShoppingCardContext} from "../../helpers/ShoppingCardState";
import {useCleanLocalStorage} from "../../hooks/useCleanLocalStorage";

const ProductsPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {setIsCardChange, isCardChange} = useContext(ShoppingCardContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const searchButtonColor = isSearchOpen ? "text-green-400" : "";
    const categoryButtonColor = isCategoryOpen ? "text-green-400" : "";
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesMap, setCategoriesMap] = useState({});
    const minDate = useMinDate();
    useCleanLocalStorage();

    useEffect(() => {
        LocalStorageCheck();
        apiUser.fetchProductCategories(setCategoriesMap, null, errorNotify);
    }, []);

    const loadingElements = () => {
        let isoDate = selectedDate.toISOString();
        let dateOnly = isoDate.slice(0, 10);
        let categoryNumbers = null;
        if (selectedCategories !== null && selectedCategories.length > 0) {
            categoryNumbers = selectedCategories.map(category => categoriesMap[category]);
        }
        const fetchProductsPaginationNumber = async () => {
            await apiAdmin.fetchProductsPaginationNumber(searchTerm, categoryNumbers, setPaginationNumber, errorNotify);
        };
        const fetchUserProductsList = async () => {
            await apiUser.fetchUserProductsList(dateOnly, currentPage - 1, categoryNumbers, searchTerm, setProducts, errorNotify);
        };

        Promise.all([fetchProductsPaginationNumber(), fetchUserProductsList()]).then(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        loadingElements();
    }, [selectedCategories, categoriesMap]);

    useEffect(() => {
        loadingElements();
    }, [searchTerm, currentPage, selectedDate]);

    const handleSearchIconClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleCategoryClick = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const handleCategorySelection = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);
    };

    const handleAddToCart = async (event, productId, name) => {
        event.preventDefault();
        const quantity = 1;
        const isoDate = selectedDate.toISOString();
        const dateOnly = isoDate.slice(0, 10);
        const cartKey = `${dateOnly}`;

        await apiCommon.fetchMaximumProductQuantity(dateOnly, productId, (data) => {
            if (data >= 1) {
                let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

                const existingProductIndex = cartItems.findIndex(item => item.name === name);

                if (existingProductIndex === -1) {
                    cartItems.push({
                        name: name, quantity: quantity,
                    });
                    successNotify("Dodano do koszyka.")
                } else {
                    errorNotify("Produkt znajduje się już w koszyku!")
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
            }
        }, errorNotify, null, null);
    };

    return (<div
        className=" overflow-x-hidden h-auto bg-gradient-to-b from-[#F5F5F5] via-gray-300 to-[#F5F5F5] py-10 xl:px-24 2xl:px-64 justify-center flex flex-grow">
        {isLoading ? <LoadingComponent/> :
            <div className="border-2 h-full rounded shadow-lg bg-[#EBEBEB] w-full mx-2 p-2 max-w-7xl">
                <div className="w-auto p-4 grid grid-cols-1 md:grid-cols-8">
                    <div className="h-12 z-20 my-2 md:col-span-2">
                        <CustomDatePicker
                            minDate={minDate()}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            color="[#EBEBEB]"
                            text="Data zamówienia"
                        />
                    </div>
                    <div className="h-12 justify-end flex items-center md:col-span-6 sm:pr-4 relative my-2">
                        {isSearchOpen ? (<AnimatedSearchInput isSearchOpen={isSearchOpen} searchTerm={searchTerm}
                                                              onInputChange={handleInputChange}/>) : null}

                        <AnimatedIconButton handleIconClick={handleSearchIconClick} Icon={FaSearch}
                                            color={searchButtonColor}/>
                    </div>
                    <div className="h-12 justify-end flex items-center md:col-span-8 sm:pr-4 relative my-2 sm:mt-4">
                        {isCategoryOpen ? (<ProductsCategories handleCategorySelection={handleCategorySelection}
                                                               selectedCategories={selectedCategories}/>) : null}
                        <AnimatedIconButton handleIconClick={handleCategoryClick} Icon={TbCategory}
                                            color={categoryButtonColor}/>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 gap-x-10 sm:px-14 py-3">
                    {products.length > 0 ? (products.map((product, index) => (<Fade duration={1500}>
                        <Link key={index} to={`/produkt/${product.productId}`}>
                            <motion.div
                                className="lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-2 cursor-pointer"
                                whileHover={{scale: 1.1, transition: {duration: 0.3}}}
                            >
                                <div className="relative cursor-pointer">
                                    <img
                                        is="img"
                                        src={product.image || notFoundImage}
                                        alt={product.name}
                                        className="w-full h-64 object-cover object-center"
                                    />
                                </div>
                                <div className="p-4 flex flex-col justify-between bg-yellow-orange-200">
                                    <div className="justify-between grid grid-cols-2">
                                        <h2 className="text-gray-600 text-xl font-semibold">{product.name}</h2>
                                        <div className="flex items-center justify-end">
                                            <p className="text-gray-600 text-lg font-semibold">{product.price} zł</p>
                                        </div>
                                    </div>
                                    <div className="bottom-4 right-4 justify-between grid grid-cols-4">
                                        <div className="justify-start flex col-span-3">
                                            {product.availableQuantity > 0 ? (<div className="flex items-center">
                                                <IoMdCheckmarkCircleOutline
                                                    className=" bottom-2 right-2 text-green-600 text-xl"/>
                                                <span
                                                    className="text-sm sm:text-md font-sans font-bold text-green-600">Produkt dostępny</span>
                                            </div>) : (<div className="flex items-center">
                                                <FcCancel className="text-red-600 text-3xl mr-2"/>
                                                <span
                                                    className="text-sm sm:text-md font-sans font-bold text-red-600">Produkt niedostępny</span>
                                            </div>)}
                                        </div>
                                        <div className="justify-end flex">
                                            <AnimatedIconButton
                                                Icon={FaShoppingCart}
                                                handleIconClick={(event) => handleAddToCart(event, product.productId, product.name)}
                                                color="text-gray-600 hover:text-green-500 text-2xl sm:text-3xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </Fade>))) : (<div className="flex items-center justify-center h-40 lg:col-span-2">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-600">Nie znaleziono żadnych
                                produktów.</h2>
                            <p className="text-lg text-gray-500 mt-2">Spróbuj zmienić kryteria wyszukiwania.</p>
                        </div>
                    </div>)}
                </div>

                <div className="w-full flex justify-center relative bottom-0 py-4">
                    <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange}
                                      initialPage={currentPage}/>
                </div>
            </div>}
    </div>);
};

export default ProductsPage;
