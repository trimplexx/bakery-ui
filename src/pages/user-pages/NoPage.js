import React from 'react';
import {Error404} from "../../utils/props";
import {FaSadCry} from "react-icons/fa";
import {NavLink} from 'react-router-dom';

const NoPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center justify-center h-1/4 w-full bg-[#FEE1A5] text-white">
                <h2 className="text-gray-700 text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 px-4 flex items-center justify-center">
                    Ups! Wygląda na to, że zgubiłeś się w naszej kuchni
                    <span className="ml-2"><FaSadCry /></span>
                </h2>
                <div className="flex justify-center">
                    <NavLink to="/" className="mb-8 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                        Przejdź do strony głównej
                    </NavLink>
                </div>
            </div>


            <div className="w-full h-3/4">
                <img src={Error404} alt="Error 404" className="w-full h-full object-cover"/>
            </div>
        </div>
    );
};

export default NoPage;
