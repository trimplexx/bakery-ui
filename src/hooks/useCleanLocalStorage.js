// cleanLocalStorage.js
import { useEffect } from 'react';

export const useCleanLocalStorage = () => {
    useEffect(() => {
        // Czyszczenie przedawnionych koszyków.
        const today = new Date();
        today.setHours(15, 45, 0, 0);
        console.log(today);

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const dateKey = new Date(key);
            if ((dateKey < today && new Date().getHours() > 15) || (new Date().getHours() === 15 && new Date().getMinutes() >= 45)) {   // Pobierz wartość "selectedOption" z localStorage
                const selectedOption = localStorage.getItem('selectedOption');

                // Jeżeli wartość "selectedOption" jest równa kluczowi do usunięcia, usuń również "selectedOption"
                if (selectedOption === key) {
                    localStorage.removeItem('selectedOption');
                }

                localStorage.removeItem(key);
            }
        }
    }, []);
}
