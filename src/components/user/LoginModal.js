import React, {useState} from "react";
import "../../styles/modal.css"
import {AnimatedModal} from "../common/AnimatedModal";
import {errorNotify} from "../../helpers/ToastNotifications";
import SubmitButton from "../common/SubmitButton";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import api from "../../utils/api";


const LoginModal = ({onClose, onRegisterClick}) => {
    useCloseOnEsc(onClose);
    const { register, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        await api.login(data, setIsLoading, errorNotify);
    };

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <AnimatedModal onClose={onClose}>
        <form className="bg-white p-7 rounded-lg w-600 shadow-md w-[400px]" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-8 text-4xl text-center max-w-lg font-semibold leading-loose text-[#fda329] ">Logowanie</h1>
            <div className="grid gap-6 mb-2">
                <FormInput register={register} id="email" label="Email" type="email" maxLength="50" onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <FormInput register={register} id="password" label="Hasło" type={showPassword ? "text" : "password"} maxLength="20"
                           onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <div className="grid items-center mb-4 grid-cols-2 ">
                    <div>
                        <input type="checkbox" id="show-password" onClick={toggleShowPassword} value="" className=" cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"/>
                        <label htmlFor="show-password"
                               className="cursor-pointer ml-2 text-sm text-gray-900">Pokaż hasło</label>
                    </div>
                    <span className="justify-self-end cursor-pointer hover:text-yellow-400 text-sm" >Zapomniałeś hasła?</span>
                </div>
                <SubmitButton isLoading={isLoading} text="Zaloguj się"/>
                <div className="flex space-x-1 justify-end ">
                    <p> Nie posiadasz konta? </p> <span className="cursor-pointer hover:text-yellow-400" onClick={onRegisterClick}> Zarejestruj się.  </span>
                </div>
            </div>
        </form>
            </AnimatedModal>
    );
};

export default LoginModal;