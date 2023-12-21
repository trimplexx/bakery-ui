import React from 'react';
import BasicInput from "../common/BasicInput";
import {errorNotify} from "../../helpers/ToastNotifications";
const OrderConfirmModal = ({ visible, message, onConfirm, onCancel, phoneNumber, setPhoneNumber }) => {
    const isPhoneNumberValid = phoneNumber.length === 9;
    if (!visible) {
        return null;
    }

    const handleConfirm = () => {
        if (isPhoneNumberValid) {
            onConfirm();
        } else {
            errorNotify('Numer telefonu musi zawierać dokładnie 9 cyfr!');
        }
    };

    return (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-start overflow-auto bg-gray-500 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md mx-auto my-6 md:my-0 ">
                <div className="backgroundElements relative rounded-lg shadow mt-20 bg-white" >
                    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onCancel}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 w-12 h-12 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
                        <div className="flex">
                        <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded">
                        <span className="fi fi-pl mr-2"></span> +48
                    </span>
                            <BasicInput
                                id="phone"
                                label="Numer telefonu"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <button onClick={handleConfirm} type="button" className="mt-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Tak
                        </button>
                        <button onClick={onCancel} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Nie, anuluj</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmModal;