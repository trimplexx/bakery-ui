import React from "react";
import { motion } from "framer-motion";

const AnimatedSearchInput = ({ isSearchOpen, searchTerm, onInputChange }) => {
    const inputVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    };

    return (
        <motion.input
            type="text"
            placeholder="Wyszukaj produkty..."
            className="flex mr-4 p-2 mx-6 h-12 w-full rounded border border-gray-300 focus:ring-yellow-orange-300 focus:border-yellow-orange-300 bg-transparent"
            variants={inputVariants}
            initial="hidden"
            animate={isSearchOpen ? "visible" : "hidden"}
            value={searchTerm}
            onChange={onInputChange}
        />
    );
};

export default AnimatedSearchInput;
