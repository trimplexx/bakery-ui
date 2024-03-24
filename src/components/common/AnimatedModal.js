import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../../styles/modal.css";

export const AnimatedModal = ({ children, onClose }) => {
    const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };

    return (
        <div className="modal z-50 h-full w-screen fixed top-0 left-0 flex items-center justify-center overflow-auto my-auto">
            <motion.div
                className="bg-white rounded-lg shadow-lg"
                style={{ maxHeight: windowDimensions.height }}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="absolute top-3 right-3 overflow-y-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-900"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {children}
            </motion.div>
        </div>
    );
};
