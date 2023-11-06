import { motion } from "framer-motion";

export const AnimatedModal = ({ children }) => {
    const dropIn = {
        hidden:{
            y:"-100vh",
            opacity: 0,
        },
        visible:{
            y: "0",
            opacity: 1,
            transition:{
                duration: 0.5,
                type: "spring",
                damping: 30,
                stiffness: 200,
            }
        },
        exit:{
            y:"100vh",
            opacity: 0,
        }
    }

    return (
        <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};