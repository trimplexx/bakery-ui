import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import Select from "react-select";
import {customDropdownStyles} from "../../styles/customDropdownStyles";

registerLocale('pl', pl);

const AdminProduction = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [secSelectedDate, secSetSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSecDatePicker, setShowSecDataPicker] = useState(false);
    const wrapperRef = useRef(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowDatePicker(false);
            setShowSecDataPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return(
    <>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div ref={wrapperRef} className="sm:col-span-1 h-14 z-50">
                    <div className="relative h-full">
                        <input type="text" id="date"
                               className="block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                               readOnly
                               value={selectedDate.toLocaleDateString('pl-PL')}
                               onClick={() => setShowDatePicker(!showDatePicker)}/>
                        <label htmlFor="date"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Data</label>
                    </div>
                    {showDatePicker &&
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
                    }
                </div>
                    <div ref={wrapperRef} className="sm:col-span-1 sm:col-start-4 h-14 z-50">
                        <div className="relative h-full">
                            <input type="text" id="date"
                                   className="block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                   readOnly
                                   value={secSelectedDate.toLocaleDateString('pl-PL')}
                                   onClick={() => setShowSecDataPicker(!showSecDatePicker)}/>
                            <label htmlFor="date"
                                   className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Data</label>
                        </div>
                        {showSecDatePicker &&
                            <DatePicker
                                selected={secSelectedDate}
                                onChange={(date) => {
                                    secSetSelectedDate(date);
                                    setShowSecDataPicker(false);
                                }}
                                locale="pl"
                                inline
                                className="border p-2 rounded"
                            />
                        }
                    </div>
                <button type="button" className="h-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Skopiuj z wybranego dnia</button>

            </div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr >
                    <th scope="col" className="px-6 py-3">
                        Nazwa produktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Ilość na dzień
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Pozostała ilość w tym dniu
                    </th>
                    <th scope="col" className="px-6 py-3">

                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="py-2 font-normal whitespace-nowrap">
                        <div className="px-4">
                        <div className="relative">
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                                styles={customDropdownStyles}
                            />
                        </div>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        <div className="relative">
                            <input type="number" id="quantity"
                                   className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                   placeholder=" " required/>
                            <label htmlFor="quantity"
                                   className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Ilość danego produktu</label>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                    </td>
                    <td className="px-6 py-4">
                        <button type="button" className=" focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Zapisz</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
            </>
        );
};

export default AdminProduction;