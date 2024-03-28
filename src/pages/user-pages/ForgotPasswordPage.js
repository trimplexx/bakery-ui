import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import LoadingComponent from "../../components/common/LoadingComponent";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import {useForm} from "react-hook-form";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiCommon from "../../utils/apiCommon";

const ForgotPasswordPage = () => {
    const {token} = useParams();
    const {register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [, setFormData] = useState({
        password: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData, [field]: value
        }));
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        const passwordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
        if (!passwordRegex.test(data.password)) {
            errorNotify("Hasło musi zawierać: Minimum osiem znaków, przynajmniej jedna dużą i małą literę oraz jedną cyfrę, maksymalnie 20 znaków");
            setIsLoading(false);
            return;
        }
        await apiCommon.resetPassword(data, token, setIsLoading, navigate, successNotify, errorNotify);
    };

    useEffect(() => {
        apiCommon.verifyForgotToken(token, setIsLoading, navigate, errorNotify);
    }, [token]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (<div
        className=" bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-10 px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">

            <div className="w-auto h-auto overflow-auto max-h-screen bg-white rounded-lg divide-x-2 divide-gray-300">
                <form className="px-7 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-2 text-4xl text-center max-w-lg font-[Anuphan] leading-loose text-[#fda329]">
                        Zresetuj hasło
                    </h1>
                    <h1 className="text-base text-center max-w-lg font-sans leading-loose text-black">
                        Wpisz nowe hasło. Pamiętaj, że musi mieć minimum osiem znaków, przynajmniej jedna dużą i małą
                        literę oraz jedną cyfrę, maksymalnie 20 znaków
                    </h1>
                    <div className="grid gap-6 mt-8 mb-14">
                        <FormInput register={register} id="password" label="Hasło"
                                   type={showPassword ? "text" : "password"} maxLength="20"
                                   onChange={(e) => handleInputChange('password', e.target.value)}/>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="show-password" onClick={toggleShowPassword} value=""
                                   className="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"/>
                            <label htmlFor="show-password"
                                   className="cursor-pointer ml-2 text-sm font-medium text-gray-900">Pokaż hasło</label>
                        </div>
                    </div>
                    <SubmitButton isLoading={isLoading} text="Zmień hasło"/>
                </form>
            </div>
    </div>);
};

export default ForgotPasswordPage;
