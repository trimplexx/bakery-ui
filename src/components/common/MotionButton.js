import { motion } from 'framer-motion';

const buttonVariants = {
    hover: {
        scale: 0.95,
        transition: {
            duration: 0.3,
            yoyo: Infinity
        }
    }
}

const MotionButton = ({ text, color, onClick}) => (
    <motion.button
        className={`w-full py-2 rounded-md border-none text-white bg-${color} focus:outline-none focus:ring-2 focus:ring-${color}`}
        type="submit"
        variants={buttonVariants}
        onClick={onClick}
        whileHover="hover"
    >
        {text}
    </motion.button>
);

export default MotionButton;
