import {motion} from "framer-motion";
import React from "react";
import "../../styles/modal.css"

export const AnimatedModal = ({children, onClose}) => {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 30,
                stiffness: 200,
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        }
    }

    return (
        <div className="modal z-50">
            <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="relative space-x-1 justify-end">
                    <button type="button" onClick={onClose} className="absolute top-3  right-3 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                {children}
            </motion.div>
        </div>
    );
};