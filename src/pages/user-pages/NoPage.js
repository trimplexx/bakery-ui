import React from 'react';
import {Error404} from "../../utils/props";
import {NavLink} from 'react-router-dom';
import {Fade} from "react-reveal";
import {PiSmileySadLight} from "react-icons/pi";

const NoPage = () => {
    return (
        <div className=" bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-2 px-2 sm:p-10 sm:px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">

                <Fade top>
                    <div className="grid justify-center ">
                        <div className="w-full flex justify-center items-center mb-4">
            <div className="w-52 h-52">
                <img src={Error404} alt="Error 404"/>
            </div>
                        </div>
            <div className="">
                <h2 className="text-gray-700 text-center text-xl lg:text-2xl xl:text-3xl mb-4 px-4 flex items-center justify-center" style={{fontFamily:'Lucida Console, serif' }}>
                    Ups! Wygląda na to, że zgubiłeś się w naszej kuchni
                    <span className="ml-2"><PiSmileySadLight className="text-4xl xl:text-5xl"/></span>
                </h2>
                <div className="flex justify-center">
                    <NavLink to="/" className="mb-8 bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-4 rounded" style={{fontFamily:'Lucida Console, serif' }}>
                        Przejdź do strony głównej
                    </NavLink>
                </div>
            </div>
                    </div>
                </Fade>
        </div>
    );
};

export default NoPage;
