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

const MotionButton = ({ text, color, onClick, disabled, disabledText }) => (
    <motion.button
        className={`w-full py-2 rounded-md border-none text-white ${color === 'black' ? 'bg-black' : `bg-${color}`} focus:outline-none focus:ring-2 focus:ring-${color} ${disabled ? 'cursor-not-allowed' : ''}`}
        type="submit"
        variants={buttonVariants}
        onClick={onClick}
        whileHover={!disabled ? "hover" : null}
        disabled={disabled}
        title={disabled ? disabledText : ""}
    >
        {text}
    </motion.button>
);

export default MotionButton;
