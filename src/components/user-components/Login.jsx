import React, { useState, useEffect, useRef } from "react";
import "./user-styles/Login.css";

const Login = ({ onClose, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keyup", handleEscKey);
    return () => window.removeEventListener("keyup", handleEscKey);
  }, [onClose]);

  return (
      <div className="modal" ref={modalRef}>
        <form className="login-form">
          <div className="flex space-x-1 justify-end">
            <button type="button" onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <h1 className="mb-8 text-4xl text-center max-w-lg text-3xl font-semibold leading-loose text-[#fda329] ">Logowanie</h1>
          <div className="grid gap-6 mb-2">
            <div className="relative">
              <input type="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label htmlFor="email" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hasło</label>
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="show-password" onClick={toggleShowPassword} value="" className=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]" />
              <label htmlFor="show-password" className="cursor-pointer ml-2 text-sm font-medium text-gray-900">Pokaż hasło</label>
              <span className="forgot-password">Zapomniałeś hasła?</span>
            </div>

            <button className="login-submit" type="submit">Zaloguj się</button>
            <div className="flex space-x-1 justify-end ">
              <p > Nie posiadasz konta? </p> <span onClick={onRegisterClick}> Zarejestruj się.  </span>
            </div>
          </div>
        </form>
      </div>
  );
};

export default Login;