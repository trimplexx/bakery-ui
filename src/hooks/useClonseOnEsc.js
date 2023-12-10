import { useEffect } from 'react';

const useCloseOnEsc = (onClose) => {
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keyup", handleEscKey);
        return () => window.removeEventListener("keyup", handleEscKey);
    }, [onClose]);
}

export default useCloseOnEsc;
