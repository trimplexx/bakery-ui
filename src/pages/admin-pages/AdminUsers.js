import React, { useState, useEffect } from "react";
import axios from "axios";
import ConnectionUrl from "../../ConnectionUrl";
import OrdersHistoryModal from "../../components/admin-components/OrdersHistoryModal";
import EditUserModal from "../../components/admin-components/EditUserModal";

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
        axios.get( ConnectionUrl.connectionUrlString +'api/AdminUser/users')
            .then(response => {
                setUsers(response.data.value);
            })
            .catch(error => {
                console.error("Error fetching users: ", error);
            });
    }, []);

    return <>
        <form className="pb-4">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Wyszukaj produkt..." required/>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">Wyszukaj</button>
            </div>
        </form>
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