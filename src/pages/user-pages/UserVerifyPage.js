import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import apiCommon from "../../utils/apiCommon";

const UserVerifyPage = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiCommon.verifyUser(token, navigate, errorNotify, successNotify);
    }, [token]);


    return (<div
        className=" bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-10 px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">
            <div className="w-auto h-auto overflow-auto max-h-screen bg-white rounded-lg divide-x-2 divide-gray-300">
            </div>
    </div>);
};

export default UserVerifyPage;
