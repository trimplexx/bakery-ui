import React, {useState} from "react";
import "../../styles/modal.css"
import {AnimatedModal} from "../common/AnimatedModal";
import SubmitButton from "../common/SubmitButton";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import MotionButton from "../common/MotionButton";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiCommon from "../../utils/apiCommon";

const ForgotPasswordModal = ({onClose, onLoginClick}) => {
    useCloseOnEsc(onClose);
    const {register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [, setFormData] = useState({
        email: '',
    });

    const onSubmit = async (data) => {
        await apiCommon.forgotPassword(data, setIsLoading, onClose, successNotify, errorNotify);
    };


    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <AnimatedModal onClose={onClose}>
            <div className="w-auto h-auto overflow-auto max-h-screen bg-white rounded-lg divide-x-2 divide-gray-300">
                <form className="px-7 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-2 text-4xl text-center max-w-lg font-[lucida-console] leading-loose text-[#fda329]">
                        Zapomniałeś hasła?
                    </h1>
                    <h1 className="text-lg text-center max-w-lg font-sans leading-loose text-black">
                        Wpisz adres e-mail podany podczas rejestracji konta.
                    </h1>
                    <div className="grid gap-6 mt-8 mb-14">
                        <FormInput
                            register={register}
                            id="email"
                            label="Email"
                            type="email"
                            maxLength="50"
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </div>
                    <SubmitButton isLoading={isLoading} text="Wyślij link"/>
                </form>
                <div className="px-7 mb-6">
                    <MotionButton onClick={onLoginClick} color="red-600" text="Anuluj"></MotionButton>
                </div>
            </div>
        </AnimatedModal>

    );
};

export default ForgotPasswordModal;