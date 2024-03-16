import React, {useEffect, useState} from "react";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SubmitButton from "../common/SubmitButton";
import {useForm} from "react-hook-form";
import EditInput from "../common/EditInput";
import apiUser from "../../utils/apiUser";

const ChangePassword = () => {
    const [, setUserId] = useState(false);
    const {register, handleSubmit, setValue} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [, setUserData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            const userIdFromToken = decodedToken.UserId;
            setUserId(userIdFromToken);
            setValue('userId', userIdFromToken);
        } else {
        }
    }, [setValue]);

    const handleInputChange = (id, newValue) => {
        setUserData(prevData => ({...prevData, [id]: newValue}));
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        if (data.newPassword !== data.confirmNewPassword) {
            errorNotify("Hasła muszą być takie same.")
            setIsLoading(false);
            return;
        }

        const passwordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
        if (!passwordRegex.test(data.newPassword)) {
            errorNotify("Hasło musi zawierać: Minimum osiem znaków, przynajmniej jedna dużą i małą literę oraz jedną cyfrę, maksymalnie 20 znaków");
            setIsLoading(false);
            return;
        }
        const {confirmNewPassword, ...passwordData} = data;
        await apiUser.userChangePassword(passwordData, setIsLoading, successNotify, errorNotify)
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="py-4 sm:p-7" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-12 text-4xl text-center font-[lucida-console] leading-loose text-[#fda329] ">Zmień
                hasło</h1>
            <div className="grid gap-6 mb-3">
                <EditInput
                    register={register}
                    id="oldPassword"
                    label="Stare hasło"
                    type={showPassword ? "text" : "password"}
                    maxLength="50"
                    onChange={handleInputChange}
                />
                <EditInput
                    register={register}
                    id="newPassword"
                    label="Nowe hasło"
                    type={showPassword ? "text" : "password"}
                    maxLength="50"
                    onChange={handleInputChange}
                />
                <EditInput
                    register={register}
                    id="confirmNewPassword"
                    label="Potwierdź nowe hasło"
                    type={showPassword ? "text" : "password"}
                    maxLength="50"
                    onChange={handleInputChange}
                />
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="show-password" onClick={toggleShowPassword} value=""
                           className="cursor-pointer w-4 h-4 text-[#fda329] bg-gray-100 border-gray-300 rounded focus:ring-[#fda329]"/>
                    <label htmlFor="show-password" className="cursor-pointer ml-2 text-sm font-medium text-gray-900">Pokaż
                        hasła</label>
                </div>
            </div>

            <div className="md:col-start-2 md:col-span-3 w-full mt-3">
                <SubmitButton isLoading={isLoading} text="Zmień hasło"/>
            </div>
        </form>
    );
};

export default ChangePassword;
