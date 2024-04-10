import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import apiUser from "../../utils/apiUser";
import {errorNotify} from "../../helpers/ToastNotifications";

const ProductsCategories = ({selectedCategories, handleCategorySelection}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    const getCategoryButtonClass = (category) => {
        return `hover:text-white border-2 h-full focus:outline-none border-yellow-orange-400 ${
            selectedCategories.includes(category)
                ? "hover:bg-yellow-orange-200 hover:text-yellow-orange-400 bg-yellow-orange-400 text-white"
                : "hover:bg-yellow-orange-400 text-yellow-orange-400"
        } font-medium rounded-lg text-md px-4 py-2 text-center whitespace-nowrap mr-4`;
    };

    useEffect(() => {
        apiUser.fetchProductCategories(setCategoriesMap, null, errorNotify);
    }, []);

    const buttonVariants = {
        hidden: {x: 100, opacity: 0},
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    };

    return (
        <div className="flex justify-center w-full sm:px-4">
            <motion.div
                className="ml-6 mr-4 flex justify-between overflow-x-auto"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
            >
                {Object.entries(categoriesMap).map(([category]) => (
                    <button
                        key={category}
                        className={getCategoryButtonClass(category)}
                        onClick={() => handleCategorySelection(category)}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>
        </div>
    );
};

export default ProductsCategories;
