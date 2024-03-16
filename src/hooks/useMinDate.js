import { useCallback } from 'react';

const useMinDate = () => {
    return useCallback(() => {
        const now = new Date();
        if (now.getDay() === 6) {
            if (now.getHours() < 13 || (now.getHours() === 13 && now.getMinutes() < 45))
                return now;
            else
                return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
        } else {
            if (now.getHours() < 16 || (now.getHours() === 16 && now.getMinutes() < 45))
                return now;
            else
                return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        }
    }, []);
};

export default useMinDate;
