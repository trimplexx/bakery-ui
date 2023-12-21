import React, { useState, useEffect } from "react";
import OrdersHistoryModal from "../../components/admin/OrdersHistoryModal";
import EditUserModal from "../../components/admin/EditUserModal";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SearchInput from "../../components/common/SearchInput";
import {FaTrashAlt} from "react-icons/fa";
import api from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import CustomPagination from "../../components/common/CustomPagination";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [isModalClosed, setIsModalClosed] = useState(false);
    const [isHistoryModalClosed, setIsHistoryModalClosed] = useState(false);
    const [editedUserId, setEditedUserId] = useState(null);
    const [historyUserPhone, setHistoryUserPhone] = useState(null);
    const { isAdmin } = useAuth();
    const [searchTerm, setSearchTerm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNumber, setPaginationNumber] = useState(null);

    const handleOpenEditModal = (userId) => {
        setEditedUserId(userId);
        setIsModalClosed(false);
    };

    const handleCloseEditModal = () => {
        setEditedUserId(null);
        setIsModalClosed(true);
    };

    const handleOpenHistoryModal = (phone) => {
        setHistoryUserPhone(phone);
        setIsHistoryModalClosed(false);
    };

    const handleCloseHistoryModal = () => {
        setHistoryUserPhone(null);
        setIsHistoryModalClosed(true);
    };

    useEffect(() => {
        const fetchUsersPaginationNumber = async () => {
            await api.fetchUsersPaginationNumber(setPaginationNumber, errorNotify);
        };

        const fetchUsersList = async () => {
            await api.fetchUsersList(currentPage-1, searchTerm, setUsers, errorNotify);
        };

        fetchUsersPaginationNumber();
        fetchUsersList();
    }, [currentPage, isModalClosed, searchTerm]);

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tego użytkownika?");
        if (confirmDelete) {
            console.log(userId);
            await api.deleteUser(userId, successNotify, errorNotify);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        await api.fetchUsersList(page-1, searchTerm, setUsers, errorNotify);
    };

    const handleSearchInputChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return <>
        <SearchInput text="Wyszukaj produkt..." onChange={handleSearchInputChange} />
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
                    <th scope="col" className="px-6 py-3 flex justify-center">
                        Usuń
                    </th>
                </tr>
                </thead>
                <tbody>

                {users.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                        <th scope="row" className="px-6 py-4 text-black">
                            {index+ (currentPage-1)*12 + 1 +"."}
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
                            <span onClick={() => handleOpenHistoryModal(user.phone)} className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Historia</span>
                            {historyUserPhone === user.phone && (
                                <OrdersHistoryModal phone={user.phone} onClose={handleCloseHistoryModal} />
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <span onClick={() => handleOpenEditModal(user.userId)} className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Edytuj</span>
                            {editedUserId === user.userId && (
                                <EditUserModal userId={user.userId} onClose={handleCloseEditModal} />
                            )}
                        </td>
                        <td className="px-6 py-4 flex justify-center">
                            {isAdmin ? (
                                <button
                                    className="rounded-full bg-white p-2 hover:bg-red-200 mr-1"
                                    onClick={() => handleDeleteUser(user.userId)}
                                >
                                    <FaTrashAlt className="text-red-500" />
                                </button>
                            ): null }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="w-full flex justify-center relative bottom-0 py-4">
            <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange} initialPage={currentPage}/>
        </div>
    </>;
};

export default AdminUsers;