import React, { useState, useEffect } from "react";
import axios from "axios";
import {connectionUrlString} from "../../utils/props";
import OrdersHistoryModal from "../../components/admin/OrdersHistoryModal";
import EditUserModal from "../../components/admin/EditUserModal";
import {errorNotify} from "../../helpers/ToastNotifications";
import SearchInput from "../../components/common/SearchInput";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleOpenEditModal = (userId) => {
        setSelectedUserId(userId);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleOpenHistoryModal = () => {
        setHistoryModalOpen(true);
    };

    const handleCloseHistoryModal = () => {
        setHistoryModalOpen(false);
    };

    useEffect(() => {
        axios.get( connectionUrlString +'api/AdminUser/usersList')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                errorNotify(error.response.data.error);
            });
    }, []);

    return <>
        <SearchInput text="Wyszukaj użytkownika..."/>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr >
                    <th scope="col" className="px-2 py-3">
                        Numer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Imię nazwisko
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Numer telefonu
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Zamówienia
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Edytuj
                    </th>
                </tr>
                </thead>
                <tbody>

                {users.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even:bg-gray-50 even:dark:bg-gray-800" : "odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700"}>
                        <th scope="row" className="px-6 py-4 text-black">
                            {index + 1 +"."}
                        </th>

                        <td className="px-6 py-4">
                            {`${user.firstName} ${user.lastName}`}
                        </td>
                        <td className="px-6 py-4">
                            {user.phone}
                        </td>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            <span onClick={handleOpenHistoryModal} className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Historia</span>
                            {isHistoryModalOpen && <OrdersHistoryModal onClose={handleCloseHistoryModal} />}
                        </td>
                        <td className="px-6 py-4">
                            <span onClick={() => handleOpenEditModal(user.userId)} className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Edytuj</span>
                            {isEditModalOpen && <EditUserModal userId={selectedUserId} onClose={handleCloseEditModal} />}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>;
};

export default AdminUsers;