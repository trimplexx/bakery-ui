import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Select from "react-select";
import { customDropdownStyles } from "../../styles/customDropdownStyles";
import { IoCashOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ProductShoppingCard from "../common/ProductsShoppingCard";
import { useOrderFunctions } from "../../hooks/useCardFunctions";

const ShoppingCard = ({ isOpen, onClose }) => {
    const sidebarRef = useRef(null);
    const controls = useAnimation();
    const [maxHeight, setMaxHeight] = useState(0);
    const {
        productData,
        storedDates,
        selectedOption,
        handleSelectChange,
        handleQuantityChange,
        handleDelete,
        calculateTotalPrice,
    } = useOrderFunctions();

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '100%' }
    };

    useEffect(() => {
        if (isOpen) {
            controls.start('open');
        } else {
            controls.start('closed');
        }
    }, [isOpen, controls]);

    useEffect(() => {
        if (sidebarRef.current) {
            const height = sidebarRef.current.offsetHeight;
            setMaxHeight(window.innerHeight - height);
        }
    }, [sidebarRef, isOpen]);

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);


    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
            <motion.div
                className="fixed inset-0 z-30 bg-gray-900 opacity-0"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.aside
                ref={sidebarRef}
                className="fixed inset-y-0 right-0 z-50 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] bg-gradient-to-b from-[#F5F5F5] via-gray-300 to-[#F5F5F5] shadow-md flex flex-col"
                initial={false}
                animate={controls}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="flex justify-end p-4">
                    <div className="relative space-x-1 justify-end">
                        <button type="button" onClick={onClose}
                                className="absolute top-3  right-3 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full justify-center flex items-end mt-6">
                    <p className="text-3xl font-medium text-gray-900">Koszyk</p>
                </div>
                <div className="p-6">
                    <Select
                        options={storedDates}
                        value={storedDates.find(option => option.value === selectedOption)}
                        styles={customDropdownStyles}
                        onChange={handleSelectChange}
                        noOptionsMessage={() => "Brak dostępnych koszyków."}
                        placeholder="Wybierz koszyk z produktami."
                    />
                </div>
                {Array.isArray(productData) && productData.length > 0 ? (
                    <div className="overflow-y-auto flex-grow" >
                        {productData.map((product, index) => (
                            <ProductShoppingCard
                                key={index}
                                product={product}
                                index={index}
                                date={selectedOption}
                                handleQuantityChange={handleQuantityChange}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>

                ) : (
                    <div className="flex-grow items-center mx-4 bg-gray-300 rounded mb-4 justify-center">
                        <div className="p-4 items-center justify-center flex text-lg">
                            Koszyk jest pusty wybierz date.
                        </div>
                    </div>
                )}
                <div className="bottom-0 grid grid-cols-2  w-full p-2 bg-[#F5F5F5] items-center">
                    <p className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Suma: {calculateTotalPrice()} zł</p>
                    <NavLink to="/podsumowanie" className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-center text-md text-black bg-yellow-orange-200 hover:bg-yellow-orange-300 focus:outline-none focus:ring-4 focus:ring-yellow-orange-300 font-medium rounded-full px-5 py-2.5 flex justify-center items-center"
                        >
                            Przejdź do realizacji <IoCashOutline className="ml-2 text-3xl" />
                        </button>
                    </NavLink>
                </div>
            </motion.aside>
        </div>
    );
};

export default ShoppingCard;
