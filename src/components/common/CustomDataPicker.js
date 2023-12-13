// CustomDatePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <div className="relative h-full">
            <input
                type="text"
                id="date"
                className="block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                readOnly
                value={selectedDate.toLocaleDateString('pl-PL')}
                onClick={() => setShowDatePicker(!showDatePicker)}
            />
            <label
                htmlFor="date"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                Data
            </label>
            {showDatePicker && (
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                    }}
                    locale="pl"
                    inline
                    className="border p-2 rounded"
                />
            )}
        </div>
    );
};

export default CustomDatePicker;
