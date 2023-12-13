import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import {connectionUrlString} from "../../utils/props";
import {errorNotify} from "../../helpers/ToastNotifications";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import SubmitButton from "../common/SubmitButton";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import api from "../../utils/api";

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
            await api.fetchSingleUser(connectionUrlString, userId, setUserData, errorNotify);
        };

        fetchData();
    }, [userId, setValue]);


    const onSubmit = async (data) => {
        setIsLoading(true);
        await api.adminChangeUserData(connectionUrlString, data, setIsLoading, errorNotify);
    };

    return (
        <div className="fixed inset-0 z-50">
            <AnimatedModal onClose={onClose}>
                <form className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-12 text-4xl text-center w-auto font-semibold leading-loose text-[#fda329] ">Edytuj użytkownika</h1>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <FormInput register={register} id="firstName" label="Imię" type="text" defaultValue={userData.firstName} />
                        <FormInput register={register} id="lastName" label="Nazwisko" type="text" defaultValue={userData.lastName} />
                    </div>
                    <div className="grid gap-6 mb-3">
                        <FormInput register={register} id="phone" label="Numer telefonu" type="text" defaultValue={userData.phone} />
                        <FormInput register={register} id="email" label="Email" type="email" defaultValue={userData.email} />
                    </div>

                    <div className=" md:col-start-2 md:col-span-3 w-full mt-10">
                        <SubmitButton isLoading={isLoading} text="Zapisz zmiany"/>
                    </div>
                </form>
            </AnimatedModal>
        </div>);
};

export default EditUserModal;