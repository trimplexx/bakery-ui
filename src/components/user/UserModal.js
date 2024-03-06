import React, { useState, useEffect } from "react";
import "../../styles/modal.css";
import { AnimatedModal } from "../common/AnimatedModal";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import EditData from "./EditData";
import ChangePassword from "./ChangePassword";
import OrdersHistory from "./OrdersHistory";

const UserModal = ({ onClose }) => {
    useCloseOnEsc(onClose);

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showEditData, setShowEditData] = useState(true); // Domyślnie ustawione na true
    const [showOrdersHistory, setShowOrdersHistory] = useState(false); // Dodany stan dla komponentu OrdersHistory

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('successNotifyStorage', "Nastąpiło wylogowanie");
        window.location.reload(true);
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
        // Resetowanie stanów przy zamknięciu modala
        setShowChangePassword(false);
        setShowEditData(true);
        setShowOrdersHistory(false);
    }, [onClose]);


    return (
        <AnimatedModal onClose={onClose}>
            <div className="flex flex-col w-full h-full max-w-screen-lg max-h-screen mx-auto overflow-auto bg-white rounded-2xl">
                <div className="flex-shrink-0 bg-gray-300 rounded-t-xl sm:px-4 pt-8 flex flex-col min-h-1/2 max-h-4/5">
                    <div className="flex justify-around">
                        <button
                            className={`text-center rounded-t-xl p-2 sm:p-4 sm:text-lg font-bold sm:mr-4 text-gray-900 ${showEditData ? 'bg-white' : 'hover:bg-white '} focus:outline-none focus:ring-0`}
                            onClick={openEditData}
                        >
                            Zmień dane
                        </button>
                        <button
                            className={`text-center rounded-t-xl p-2  sm:p-4  sm:text-lg sm:mr-4 font-bold text-gray-900 ${showChangePassword ? 'bg-white' : 'hover:bg-white'} focus:outline-none focus:ring-0`}
                            onClick={openChangePassword}
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
                        <ChangePassword onClose={() => setShowChangePassword(false)} />
                    )}
                    {showEditData && (
                        <EditData onClose={() => setShowEditData(false)} />
                    )}
                    {showOrdersHistory && (
                        <OrdersHistory onClose={() => setShowOrdersHistory(false)} />
                    )}
                </div>
            </div>
        </AnimatedModal>
    );




};

export default UserModal;
