import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

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

                <form className="pb-4 sm:col-start-3 sm:col-span-3 h-14">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Wyszukaj numer telefonu" required/>
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">Wyszukaj</button>
                    </div>
                </form>

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
