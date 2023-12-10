import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import SearchInput from "../../components/common/SearchInput";

registerLocale('pl', pl);

const AdminOrders = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowDatePicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
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
            <div className="sm:col-start-3 sm:col-span-3 h-14">
                <SearchInput text="Wyszukaj numer telefonu..."/>
            </div>
        </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="px-6 py-3">
                            Imię nazwisko
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numer telefonu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produkty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Suma
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Zrealizowane
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Łukasz Krawczyk
                        </th>
                        <td className="px-6 py-4">
                            734410872
                        </td>
                        <td className="px-6 py-4">
                            Chlep, Chlep, Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,ChlepChlep, Chlep, Chlep, Chlep, , Chlep,Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,Chlep, Chlep,
                        </td>
                        <td className="px-6 py-4">
                            102 zł
                        </td>
                        <td className="px-6 py-4 ">
                            <div className="justify-center flex">
                                <input type="checkbox" id="complete" className=" cursor-pointer w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600"/>
                            </div>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminOrders;
