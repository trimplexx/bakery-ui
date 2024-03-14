import React from 'react';

const EditInput = ({ register, id, label, type, value, onChange, maxLength, disabled, minLength }) => {

    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        if (maxLength && inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
        }
        onChange({ target: { value: inputValue } });
    };

    const inputStyle = disabled ? {
        backgroundColor: "#9ca3af",
        cursor: 'not-allowed',
    } : {};

    return (
        <div className="relative flex-grow">
            <input
                {...register(id, { required: true })}
                type={type}
                id={id}
                value={value}
                onChange={handleInputChange}
                maxLength={maxLength}
                minLength={minLength}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer`}
                placeholder=" "
                style={inputStyle}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                {label}
            </label>
        </div>
    );
};

export default EditInput;
