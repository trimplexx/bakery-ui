import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import SubmitButton from "../common/SubmitButton";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import apiAdmin from "../../utils/apiAdmin";

const EditUserModal = ({userId, onClose}) => {
    useCloseOnEsc(onClose);

    const { register, handleSubmit,setValue} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        setValue('userId', userId);
        const fetchData = async () => {
            await apiAdmin.fetchSingleUser(userId, setUserData, errorNotify);
        };

        fetchData();
    }, [userId, setValue]);


    const onSubmit = async (data) => {
        setIsLoading(true);
        await apiAdmin.adminChangeUserData(data, setIsLoading, errorNotify, successNotify);
    };

    const handleInputChange = (id, newValue) => {
        setUserData(prevData => ({ ...prevData, [id]: newValue }));
    };

    return (
        <div className="fixed inset-0 z-50">
            <AnimatedModal onClose={onClose}>
                <form className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-12 text-4xl text-center w-auto font-semibold leading-loose text-[#fda329] ">Edytuj użytkownika</h1>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <FormInput register={register} id="firstName" label="Imię" type="text" maxLength="40" value={userData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                        <FormInput register={register} id="lastName" label="Nazwisko" type="text" maxLength="50" value={userData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                    </div>
                    <div className="grid gap-6 mb-3">
                        <div className="flex">
                                        <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-300 border border-gray-400 rounded">
                                            <span className="fi fi-pl mr-2"></span> +48
                                        </span>
                            <FormInput register={register} id="phone" label="Numer telefonu" maxLength="9" type="text"
                                       value={userData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}/>
                        </div>
                        <FormInput register={register} id="email" label="Email" type="email" maxLength="50" value={userData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    </div>

                    <div className=" md:col-start-2 md:col-span-3 w-full mt-10">
                        <SubmitButton isLoading={isLoading} text="Zapisz zmiany"/>
                    </div>
                </form>
            </AnimatedModal>
        </div>
    );
};

export default EditUserModal;