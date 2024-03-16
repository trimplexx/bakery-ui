import React from "react";
import {motion} from "framer-motion";

const AnimatedIconButton = ({handleIconClick, Icon, color}) => {
    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                yoyo: Infinity,
            },
        },
    };

    return (
        <motion.button
            className="bg-transparent border-none cursor-pointer outline-none focus:outline-none"
            onClick={handleIconClick}
            whileHover="hover"
            variants={buttonVariants}
        >
            <motion.span whileHover="hover">
                <Icon className={`text-2xl ${color}`}/>
            </motion.span>
        </motion.button>
    );
};

export default AnimatedIconButton;
