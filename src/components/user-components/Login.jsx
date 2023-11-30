import React, {useEffect,  useState} from "react";
import axios from 'axios'; // Aby wykonać żądania HTTP
import "./user-styles/Login.css";
import connectionUrl from "../../ConnectionUrl";
import {AnimatedModal} from "./AnimatedModal";
import {motion} from "framer-motion";
import {errorNotify} from "../../helpers/ToastNotifications";


const Login = ({onClose, onRegisterClick}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(connectionUrl.connectionUrlString + 'api/Auth/Login', {
                email, password,
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('successNotifyStorage', 'Poprawnie zalogowano');
            window.location.reload(true);
        } catch (error) {
            if (error.response) {
                // Błąd pochodzi od serwera
                let serverError = error.response.data;
                if (serverError.error && serverError.message) {
                    errorNotify(serverError.message);
                } else {
                    errorNotify("Nieznany błąd serwera.");
                }
            } else if (error.request) {
                // Odpowiedź nie została otrzymana
                errorNotify("Nie otrzymano odpowiedzi. Sprawdź połączenie internetowe.");
            } else {
                // Inny błąd
                errorNotify(error.message);
            }
        }
        finally{
            setIsLoading(false);
        }
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


    const buttonVariants = {
        hover: {
            scale: 0.95,
            transition: {
                duration: 0.3,
                yoyo: Infinity  // powtarza animację
            }
        }
    }

    return (
        <div className="modal">
            <AnimatedModal>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="flex space-x-1 justify-end">
                <button type="button" onClick={onClose}
                        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <h1 className="mb-8 text-4xl text-center max-w-lg font-semibold leading-loose text-[#fda329] ">Logowanie</h1>
            <div className="grid gap-6 mb-2">
                <div className="relative">
                    <input type="email" id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                           placeholder=" " required/>
                    <label htmlFor="email"
                           className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                </div>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                           placeholder=" " required/>
                    <label htmlFor="password"
                           className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hasło</label>
                </div>
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="show-password" onClick={toggleShowPassword} value=""
                           className=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"/>
                    <label htmlFor="show-password"
                           className="cursor-pointer ml-2 text-sm font-medium text-gray-900">Pokaż hasło</label>
                    <span className="forgot-password">Zapomniałeś hasła?</span>
                </div>
                {!isLoading && (<motion.button
                    className="login-submit"
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                > Zaloguj się
                </motion.button>)
                }
                {isLoading && (<motion.button
                    className="login-submit"
                    disabled
                    type="button"
                >
                    {isLoading ? (
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : (
                        'Zaloguj się'
                    )}
                </motion.button>)
                }
                <div className="flex space-x-1 justify-end ">
                    <p> Nie posiadasz konta? </p> <span onClick={onRegisterClick}> Zarejestruj się.  </span>
                </div>
            </div>
        </form>
            </AnimatedModal>
        </div>
    );
};

export default Login;