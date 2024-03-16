// CustomDatePicker.js
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({selectedDate, setSelectedDate, color, text, minDate}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dynamicClassName = `absolute text-sm text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-${color} px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`;

    const saveDateToLocalStorage = (date) => {
        date.setHours(8, 0, 0, 0);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        localStorage.setItem('selectedDate', date.toISOString());
    };


    useEffect(() => {
        const storedDate = localStorage.getItem('selectedDate');
        if (storedDate) {
            const date = new Date(storedDate);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
            }
        }
    }, [setSelectedDate]);

    return (
        <div className="relative h-full">
            <input
                type="text"
                id="date"
                className="z-10 block px-2.5 pb-2.5 pt-4 w-full h-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                readOnly
                value={selectedDate.toLocaleDateString('pl-PL')}
                onClick={() => setShowDatePicker(!showDatePicker)}
            />
            <label
                htmlFor="date"
                className={dynamicClassName}
            >
                {text}
            </label>
            {showDatePicker && (
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                        saveDateToLocalStorage(date); // Zapis daty do localStorage po zmianie
                    }}
                    minDate={minDate}
                    locale="pl"
                    inline
                    className="border p-2 rounded"
                />
            )}
        </div>
    );
};

export default CustomDatePicker;
