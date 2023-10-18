import React, { useState, useEffect, useRef } from "react";
import "./user-styles/Login.css";
import "./user-styles/Registration.css"

const Login = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    setModalOpen("register");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  };

  const handleModalClose = () => {
    setModalOpen('login');
    document.getElementById("first_name").value = "";
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (modalRef.current && modalRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick} ref={modalRef}>
      {modalOpen === "login" ? (
        <form className="login-form">
          <div class="flex space-x-1 justify-end">
            <button type="button" onClick={onClose} class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <h1 class="mb-8 text-4xl text-center max-w-lg text-3xl font-semibold leading-loose text-[#fda329] dark:text-white">Logowanie</h1>
          <div class="grid gap-6 mb-2">
            <div class="relative">
              <input type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
            </div>
            <div class="relative">
              <input type={showPassword ? "text" : "password"} id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hasło</label>
            </div>
            <div class="flex items-center mb-4">
              <input type="checkbox" id="show-password" onClick={toggleShowPassword} value="" class=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329] dark:focus:ring-[#fda329] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="show-password" class="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pokaż hasło</label>
              <span className="forgot-password">Zapomniałeś hasła?</span>
            </div>

            <button className="login-submit" type="submit">Zaloguj się</button>
            <div class="flex space-x-1 justify-end ">
              <p > Nie posiadasz konta? </p> <span onClick={handleRegisterClick}> Zarejestruj się.  </span>
            </div>
          </div>
        </form>
      ) : (
        <form className="registration-form">
          <div class="flex space-x-1 justify-end">
            <button type="button" onClick={onClose} class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <h1 class="mb-4 mx-8 text-4xl text-center max-w-lg text-3xl font-semibold leading-loose text-[#fda329] dark:text-white">Rejestracja</h1>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div class="relative">
              <input type="text" id="first_name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="first_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Imie</label>
            </div>
            <div class="relative">
              <input type="text" id="last_name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="last_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nazwisko</label>
            </div>
          </div>
          <div class="grid gap-6 mb-3">
            <div class="relative">
              <input type="text" id="phone" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="phone" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Numer telefonu</label>
            </div>
            <div class="relative">
              <input type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
            </div>
            <div class="relative">
              <input type={showPassword ? "text" : "password"} id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hasło</label>
            </div>
            <div class="relative">
              <input type={showPassword ? "text" : "password"} id="repeat-password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#fda329] focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
              <label for="repeat-password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-focus:dark:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Powtórz hasło</label>
            </div>
            <div class="flex items-center mb-4  ">
              <input type="checkbox" id="show-password" onClick={toggleShowPassword} value="" class="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329] dark:focus:ring-[#fda329] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="show-password" class="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pokaż hasło</label>
            </div>
            <div class="flex-auto items-start mb-4">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox" value="" class="cursor-pointer w-4 h-4 text-[#fda329] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#fda329] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#fda329] dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                <label for="terms" class="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">*Akceptuję Regulamin oraz Politykę prywatności. </label>
                <span class="cursor-pointer ml-2 text-sm font-medium text-[#fda329] hover:text-[#8b8a8a]">(Link)</span>
              </div>
            </div>
            <button id="register_submit" className="register_submit" type="submit">Zarejestruj się</button>
          </div>
          <div class="flex space-x-1 justify-end">
            <p > Posiadasz konto? </p> <span onClick={handleModalClose}> Przejdź do logowania.  </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
