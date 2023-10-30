import React, { useState, useEffect, useRef } from "react";
import "./user-styles/Registration.css";
import axios from "axios";

const Registration = ({ onClose, onLoginClick }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const modalRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Hasła muszą być takie same.");
            return;
        }
        try {
            const response = await axios.post("https://localhost:44350/api/Auth/Register", {
                firstName,
                lastName,
                phone,
                email,
                password,
            });
            if (response.data.error) {
                setError(response.data.message);
            } else {
                setSuccess(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                // Błąd pochodzi od serwera
                let errors = error.response.data.errors;
                if (Array.isArray(errors)) {
                    setError(errors.join(' '));
                } else if (typeof errors === 'object') {
                    let errorMessages = Object.values(errors).map(e => e.toString());
                    setError(errorMessages.join(' '));
                } else {
                    setError(errors.toString());
                }
            } else if (error.request) {
                // Odpowiedź nie została otrzymana
                setError("Nie otrzymano odpowiedzi. Sprawdź połączenie internetowe.");
            } else {
                // Inny błąd
                setError(error.message);
            }
        }
    };

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
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="flex space-x-1 justify-end">
                    <button type="button" onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <h1 className="mb-4 mx-8 text-4xl text-center max-w-lg text-3xl font-semibold leading-loose text-[#fda329] ">Rejestracja</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="relative">
                        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="firstName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Imie</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="lastName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nazwisko</label>
                    </div>
                </div>
                <div className="grid gap-6 mb-3">
                    <div className="relative">
                        <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Numer telefonu</label>
                    </div>
                    <div className="relative">
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                    </div>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={e => setPassword(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hasło</label>
                    </div>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="repeat-password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer" placeholder=" " required/>
                        <label htmlFor="repeat-password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Powtórz hasło</label>
                    </div>
                    <div className="flex items-center mb-4  ">
                        <input type="checkbox" id="show-password" onClick={toggleShowPassword} value="" className="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]focus:ring-2" />
                        <label htmlFor="show-password" className="cursor-pointer ml-2 text-sm font-medium text-gray-900">Pokaż hasło</label>
                    </div>
                    <div className="flex-auto items-start mb-4">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="cursor-pointer w-4 h-4 text-[#fda329] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#fda329]" required />
                            <label htmlFor="terms" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 ">*Akceptuję Regulamin oraz Politykę prywatności. </label>
                            <span className="cursor-pointer ml-2 text-sm font-medium text-[#fda329] hover:text-[#8b8a8a]">(Link)</span>
                        </div>
                    </div>
                    <button id="register_submit" className="register_submit" type="submit">Zarejestruj się</button>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>
                <div className="flex space-x-1 justify-end">
                    <p> Posiadasz konto? </p> <span onClick={onLoginClick}> Przejdź do logowania.  </span>
                </div>
            </form>
        </div>
    );
};

export default Registration;