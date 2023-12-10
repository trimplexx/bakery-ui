import React from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";

const OrdersHistoryModal = ({onClose}) => {
useCloseOnEsc(onClose);


    return (
        <div className="fixed inset-0 z-50">
            <AnimatedModal onClose={onClose}>
                <form className="bg-white p-7 rounded-lg w-600 shadow-md w-[400px]">
                    <h1 className="mb-8 text-4xl text-center max-w-lg font-semibold leading-loose text-[#fda329] ">Historia zamówień</h1>

                </form>
            </AnimatedModal>
        </div>
    );
};

export default OrdersHistoryModal;