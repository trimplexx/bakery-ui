import React, {useState} from "react";
import "../../styles/modal.css"
import {AnimatedModal} from "../common/AnimatedModal";
import {errorNotify} from "../../helpers/ToastNotifications";
import SubmitButton from "../common/SubmitButton";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import apiUser from "../../utils/apiUser";
import MotionButton from "../common/MotionButton";
import LoginModalList from "../common/LoginModalList";

const LoginModal = ({onClose, onRegisterClick, onForgotPasswordClick}) => {
    useCloseOnEsc(onClose);
    const { register, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGmail, setIsLoadingGmail] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleGmailLogin = async () => {
        setIsLoadingGmail(true);
        await apiUser.handleGmailLogin(errorNotify, isLoadingGmail);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        await apiUser.login(data, setIsLoading, errorNotify);
    };

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <AnimatedModal onClose={onClose}>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-auto h-auto overflow-auto max-h-screen bg-white rounded-lg divide-x-2 divide-gray-300">
                <div>
                <form className="p-7" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h1 className="mb-8 text-4xl text-center max-w-lg font-[lucida-console] leading-loose text-[#fda329]">
                        Zaloguj się
                    </h1>
                    <div className="grid gap-6 mb-2">
                        <FormInput
                            register={register}
                            id="email"
                            label="Email"
                            type="email"
                            maxLength="50"
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <FormInput
                            register={register}
                            id="password"
                            label="Hasło"
                            type={showPassword ? 'text' : 'password'}
                            maxLength="20"
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <div className="grid items-center mb-4 grid-cols-2">
                            <div>
                                <input
                                    type="checkbox"
                                    id="show-password"
                                    onClick={toggleShowPassword}
                                    value=""
                                    className="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"
                                />
                                <label htmlFor="show-password" className="cursor-pointer ml-2 text-sm text-gray-900">
                                    Pokaż hasło
                                </label>
                            </div>
                            <span className="justify-self-end cursor-pointer hover:text-yellow-400 text-sm" onClick={onForgotPasswordClick}>Zapomniałeś hasła?</span>
                        </div>
                        <SubmitButton isLoading={isLoading} text="Zaloguj się" />
                    </div>
                </form>
                    <div className="flex justify-center items-center space-x-4">
                        <div className="h-0.5 bg-gray-300 w-20"></div>
                        <span className="text-gray-700 text-lg text-[lucida-console]">lub</span>
                        <div className="h-0.5 bg-gray-300 w-20"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 p-7">
                        <MotionButton color="red-600" isLoading={isLoadingGmail} onClick={handleGmailLogin} text="Zaloguj przez Gmail"></MotionButton>
                    </div>
                </div>
                <div className="p-7 sm:p-10">
                    <h1 className="mb-2 text-2xl max-w-lg font-[lucida-console] leading-loose text-yellow-400">Nie posiadasz konta?</h1>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Korzyści są następujące: </h2>
                    <LoginModalList/>
                    <MotionButton color="yellow-400" text="Załóż konto" onClick={onRegisterClick}></MotionButton>
                </div>
            </div>
        </AnimatedModal>

    );
};

export default LoginModal;