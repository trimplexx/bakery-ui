export const LocalStorageCheck = () => {
    // Pobranie wybranej daty z localStorage
    const selectedDate = new Date(localStorage.getItem('selectedDate'));

    // Czyszczenie przedawnionych koszyków.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

    // Sprawdzenie, czy wybrana data jest starsza niż dzisiejszy dzień lub czy obecny czas jest po godzinie 15:45
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    if (selectedDate < today || (now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 45))) {

        // Jeśli tak, ustaw datę na obecny lub następny dzień
        const newDate = (now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 45)) ? new Date(now.setDate(now.getDate() + 1)) : now;
        newDate.setHours(0, 0, 0, 0);
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
        localStorage.setItem('selectedDate', newDate.toISOString());
    }
    if(now.getDate() === 6)
    {
        if (selectedDate < today || (now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() >= 45)) ) {

            // Jeśli tak, ustaw datę na obecny lub następny dzień
            const newDate = (now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() >= 45)) ? new Date(now.setDate(now.getDate() + 2)) : now;
            newDate.setHours(0, 0, 0, 0);
            newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
            localStorage.setItem('selectedDate', newDate.toISOString());
        }
    }
};

