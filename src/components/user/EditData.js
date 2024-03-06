import React, {useEffect, useState} from "react";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SubmitButton from "../common/SubmitButton";
import {useForm} from "react-hook-form";
import EditInput from "../common/EditInput";
import apiAdmin from "../../utils/apiAdmin";
import LoadingComponent from "../common/LoadingComponent";

const EditData = () => {
    const {register, handleSubmit, setValue} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "", lastName: "", phone: "", email: ""
    });

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            const userIdFromToken = decodedToken.UserId;
            setValue('userId', userIdFromToken);

            const fetchData = async () => {
                await apiAdmin.fetchSingleUser(userIdFromToken, setUserData, errorNotify);
            };

            Promise.all([fetchData()]).then(() => {
                setIsLoading(false);
            });
        } else {
            errorNotify('Brak tokenu w localStorage');
        }
    }, [setValue]);


    const onSubmit = async (data) => {
        setIsLoading(true);
        await apiAdmin.adminChangeUserData(data, setIsLoading, errorNotify, successNotify);
    };

    const handleInputChange = (id, newValue) => {
        setUserData(prevData => ({...prevData, [id]: newValue}));
    };

    return (<div>
            {isLoading ? <LoadingComponent/> : <form className="py-4 sm:p-7"
                                                     onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-12 text-4xl text-center font-[lucida-console] leading-loose text-[#fda329]">Edytuj
                    dane</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <EditInput register={register} id="firstName" label="Imię" type="text" maxLength="40"
                               value={userData.firstName}
                               onChange={(e) => handleInputChange('firstName', e.target.value)}/>
                    <EditInput register={register} id="lastName" label="Nazwisko" type="text" maxLength="50"
                               value={userData.lastName}
                               onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                </div>
                <div className="grid gap-6 mb-3">
                    <div className="flex">
                                        <span
                                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-300 border border-gray-400 rounded">
                                            <span className="fi fi-pl mr-2"></span> +48
                                        </span>
                        <EditInput register={register} id="phone" label="Numer telefonu" maxLength="9" type="text"
                                   value={userData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}/>
                    </div>
                    <div className="relative flex-grow">
                        <input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            maxLength="50"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer cursor-not-allowed"
                            placeholder=" "
                            disabled
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-300 rounded-2xl px-2 peer-focus:px-2 peer-focus:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Email
                        </label>
                    </div>
                </div>

                <div className=" md:col-start-2 md:col-span-3 w-full mt-10">
                    <SubmitButton isLoading={isLoading} text="Zapisz zmiany"/>
                </div>
            </form>}
        </div>);
};

export default EditData;