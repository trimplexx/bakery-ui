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
            <div className="flex flex-col lg:flex-row max-h-screen max-w-screen overflow-auto bg-white rounded-2xl">
                <div className="flex-shrink-0 lg:w-1/3 bg-gray-300 rounded-2xl p-4 flex flex-col min-h-1/2 max-h-4/5 min-w-1/4 max-w-4/5">
                    <h2 className="font-bold text-3xl text-gray-900 text-center m-4 p-4 bg-gray-200 rounded-2xl">
                        Opcje
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <button
                                className={`w-full text-center rounded p-4 text-lg font-bold text-gray-900 ${showEditData ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                                onClick={openEditData}
                            >
                                Zmień dane
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-center rounded p-4 text-lg font-bold text-gray-900 ${showChangePassword ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                                onClick={openChangePassword}
                            >
                                Zmień hasło
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-center rounded p-4 text-lg font-bold text-gray-900 ${showOrdersHistory ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                                onClick={openOrdersHistory}
                            >
                                Historia zamówień
                            </button>
                        </li>
                    </ul>
                    <div className="mt-auto">
                        <button
                            className="w-full text-center hover:bg-gray-200 rounded p-4 text-lg font-bold text-red-600"
                            onClick={handleLogout}
                        >
                            Wyloguj się!
                        </button>
                    </div>
                </div>
                <div className="flex-grow p-4">
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
