import React, {useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import {useForm} from "react-hook-form";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SubmitButton from "../common/SubmitButton";
import FormInput from "../common/FormInput";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import apiUser from "../../utils/apiUser";
import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

const RegistrationModal = ({onClose, onLoginClick}) => {
    const {register, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    useCloseOnEsc(onClose);

    const onSubmit = async (data) => {
        setIsLoading(true);

        if (data.password !== data.repeatPassword) {
            errorNotify("Hasła muszą być takie same.")
            setIsLoading(false);
            return;
        }

        const phoneRegex = new RegExp("^[0-9]{9}$");
        if (!phoneRegex.test(data.phone)) {
            errorNotify("Numer telefonu jest nieprawidłowy.");
            setIsLoading(false);
            return;
        }

        const passwordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
        if (!passwordRegex.test(data.password)) {
            errorNotify("Hasło musi zawierać: Minimum osiem znaków, przynajmniej jedna dużą i małą literę oraz jedną cyfrę, maksymalnie 20 znaków");
            setIsLoading(false);
            return;
        }

        await apiUser.register(data, successNotify, errorNotify, onLoginClick, setIsLoading);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };


    return (
        <AnimatedModal onClose={onClose}>
            <form
                className="bg-white p-7 rounded-lg w-600 shadow-md w-auto sm:w-[700px] h-auto overflow-auto max-h-screen"
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-4 mx-8 text-4xl text-center font-[Anuphan] leading-loose text-[#fda329] ">Zarejestruj
                    się</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <FormInput register={register} id="firstName" label="Imie" type="text" maxLength="40"
                               onChange={(e) => handleInputChange('firstName', e.target.value)}/>
                    <FormInput register={register} id="lastName" label="Nazwisko" type="text" maxLength="50"
                               onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                </div>
                <div className="grid gap-6 mb-3">
                    <div className="flex">
            <span
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-300 border border-gray-400 rounded">
                <ReactCountryFlag countryCode="PL" svg className="mr-2" />
                +48
            </span>
                        <FormInput register={register} id="phone" label="Numer telefonu" type="text" maxLength="9"
                                   minLength="9" onChange={(e) => handleInputChange('phone', e.target.value)}/>
                    </div>
                    <FormInput register={register} id="email" label="Email" type="email" maxLength="50"
                               onChange={(e) => handleInputChange('email', e.target.value)}/>
                    <FormInput register={register} id="password" label="Hasło" type={showPassword ? "text" : "password"}
                               maxLength="20" onChange={(e) => handleInputChange('password', e.target.value)}/>
                    <FormInput register={register} id="repeatPassword" label="Powtórz hasło"
                               type={showPassword ? "text" : "password"} maxLength="20"
                               onChange={(e) => handleInputChange('repeatPassword', e.target.value)}/>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="show-password" onClick={toggleShowPassword} value=""
                               className="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"/>
                        <label htmlFor="show-password" className="cursor-pointer ml-2 font-medium text-gray-900">Pokaż
                            hasło</label>
                    </div>
                    <div className="flex-auto items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value=""
                                   className=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"
                                   required/>
                            <label htmlFor="terms" className="cursor-pointer ml-2 font-medium text-gray-900 ">
                                * Akceptuję
                                <NavLink to="regulamin" className="text-gray-500 hover:text-yellow-400 "> Regulamin </NavLink>
                                oraz
                                <NavLink to="polityka"  className="text-gray-500 hover:text-yellow-400 "> Politykę prywatności </NavLink>.
                            </label>

                        </div>
                    </div>
                    <SubmitButton isLoading={isLoading} text="Zarejestruj się"/>
                </div>
                <div className="flex space-x-1 justify-end mb-20 sm:mb-0">
                    <p> Posiadasz konto? </p> <span className="cursor-pointer hover:text-yellow-400 text-gray-500"
                                                    onClick={onLoginClick}> Przejdź do logowania.  </span>
                </div>
            </form>
        </AnimatedModal>
    );
};

export default RegistrationModal;