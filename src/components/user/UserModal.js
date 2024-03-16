import React, {useEffect, useState} from "react";
import "../../styles/modal.css";
import {AnimatedModal} from "../common/AnimatedModal";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import EditData from "./EditData";
import ChangePassword from "./ChangePassword";
import OrdersHistory from "./OrdersHistory";
import apiUser from "../../utils/apiUser";
import {errorNotify} from "../../helpers/ToastNotifications";

const UserModal = ({onClose}) => {
    useCloseOnEsc(onClose);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showEditData, setShowEditData] = useState(true); // Domyślnie ustawione na true
    const [showOrdersHistory, setShowOrdersHistory] = useState(false); // Dodany stan dla komponentu OrdersHistory
    const [isGotPassword, setIsGotPassword] = useState(true);

    const handleLogout = () => {
        window.location.href = '/logout';
    };

    const openChangePassword = () => {
        setShowEditData(false);
        setShowChangePassword(true);
        setShowOrdersHistory(false); // Zamknięcie OrdersHistory po wybraniu innej opcji
    };

    const openEditData = () => {
        setShowChangePassword(false);
        setShowEditData(true);
        setShowOrdersHistory(false); // Zamknięcie OrdersHistory po wybraniu innej opcji
    };

    const openOrdersHistory = () => {
        setShowChangePassword(false);
        setShowEditData(false);
        setShowOrdersHistory(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedToken = JSON.parse(atob(base64));
                const userIdFromToken = decodedToken.UserId;
                await apiUser.checkIfUserGotPassword(userIdFromToken, setIsGotPassword, errorNotify)
            }

            // Resetowanie stanów przy zamknięciu modala
            setShowChangePassword(false);
            setShowEditData(true);
            setShowOrdersHistory(false);
        };

        fetchData();
    }, [onClose]);


    return (
        <AnimatedModal onClose={onClose}>
            <div
                className="flex flex-col w-full h-full max-w-screen-lg max-h-screen mx-auto overflow-auto bg-white rounded-2xl min-h-[65vh]">
                <div className="flex-shrink-0 bg-gray-300 rounded-t-xl sm:px-4 pt-8 flex flex-col min-h-1/2 max-h-4/5">
                    <div className="flex justify-around">
                        <button
                            className={`text-center rounded-t-xl p-2 sm:p-4 sm:text-lg font-bold sm:mr-4 text-gray-900 ${showEditData ? 'bg-white' : 'hover:bg-white '} focus:outline-none focus:ring-0`}
                            onClick={openEditData}
                        >
                            Zmień dane
                        </button>
                        <button
                            className={`text-center rounded-t-xl p-2  sm:p-4  sm:text-lg sm:mr-4 font-bold text-gray-900 ${!isGotPassword ? 'cursor-not-allowed' : (showChangePassword ? 'bg-white' : 'hover:bg-white')}  focus:outline-none focus:ring-0`}
                            onClick={openChangePassword}
                            disabled={!isGotPassword}
                            title={!isGotPassword ? "Zalogowano poprzez Gmail, nie można zmienić hasła." : ""}
                        >
                            Zmień hasło
                        </button>
                        <button
                            className={`text-center rounded-t-xl p-2 sm:p-4  sm:text-lg sm:mr-4 font-bold text-gray-900 ${showOrdersHistory ? 'bg-white' : 'hover:bg-white'} focus:outline-none focus:ring-0`}
                            onClick={openOrdersHistory}
                        >
                            Historia zamówień
                        </button>
                        <button
                            className="text-center rounded-t-xl p-2 sm:p-4  sm:text-lg font-bold text-[lucida-console] text-red-600 hover:bg-white focus:outline-none focus:ring-0"
                            onClick={handleLogout}
                        >
                            Wyloguj się!
                        </button>
                    </div>
                </div>
                <div className="flex-grow p-2 sm:p-4 overflow-auto">
                    {showChangePassword && (
                        <ChangePassword onClose={() => setShowChangePassword(false)}/>
                    )}
                    {showEditData && (
                        <EditData onClose={() => setShowEditData(false)}/>
                    )}
                    {showOrdersHistory && (
                        <OrdersHistory onClose={() => setShowOrdersHistory(false)}/>
                    )}
                </div>
            </div>
        </AnimatedModal>
    );


};

export default UserModal;
