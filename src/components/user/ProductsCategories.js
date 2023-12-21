import React from "react";
import { motion } from "framer-motion";

const ProductsCategories = ({ selectedCategory, handleCategorySelection }) => {
    const getCategoryButtonClass = (category) => {
        return `hover:text-white border-4 h-full ${
            selectedCategory === category
                ? "border-yellow-orange-400 bg-yellow-orange-400 text-white"
                : "border-yellow-orange-400 hover:bg-yellow-orange-400 text-yellow-orange-400"
        } font-medium rounded-lg text-md px-4 py-2 text-center whitespace-nowrap mr-4`;
    };

    const categoriesMap = {
        'Chleby': 1,
        'Bułki': 2,
        'Przekąski słodkie': 3,
        'Przekąski słone': 4,
        'Bezglutenowe': 5,
        'Bez cukru': 6
    };

    const buttonVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="flex justify-center w-full px-4">
            <motion.div
                className="ml-6 flex justify-between overflow-x-auto"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
            >
                {Object.entries(categoriesMap).map(([category, number]) => (
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
