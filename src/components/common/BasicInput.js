import React from 'react';

const BasicInput = ({ id, label, type, value, onChange, maxLength }) => {
    const handleInputChange = (e) => {
        let inputValue = e.target.value;

        if (maxLength && inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
        }

        const filteredValue = inputValue.split('.')[0];

        if (filteredValue < 0) {
            return;
        }

        onChange({ target: { value: filteredValue } });
    };

    return (
        <div className="relative flex-grow w-40 lg:w-auto">
            <input
                type={type}
                id={id}
                value={value}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                placeholder=" "
                maxLength={maxLength}
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                {label}
            </label>
        </div>
    );
};

export default BasicInput;
