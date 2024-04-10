import React, {useEffect, useState} from "react";
import OrdersHistoryModal from "../../components/admin/OrdersHistoryModal";
import EditUserModal from "../../components/admin/EditUserModal";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SearchInput from "../../components/common/SearchInput";
import {FaTrashAlt} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import CustomPagination from "../../components/common/CustomPagination";
import apiAdmin from "../../utils/apiAdmin";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isModalClosed, setIsModalClosed] = useState(false);
    const [, setIsHistoryModalClosed] = useState(false);
    const [editedUserId, setEditedUserId] = useState(null);
    const [historyUserPhone, setHistoryUserPhone] = useState(null);
    const {isAdmin} = useAuth();
    const [searchTerm, setSearchTerm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [, setIsLoading] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleOpenEditModal = (userId) => {
        setEditedUserId(userId);
        setIsModalClosed(false);
    };

    const handleCloseEditModal = () => {
        setEditedUserId(null);
        setIsModalClosed(true);
    };

    const handleOpenHistoryModal = (userId) => {
        setHistoryUserPhone(userId);
        setIsHistoryModalClosed(false);
    };

    const handleCloseHistoryModal = () => {
        setHistoryUserPhone(null);
        setIsHistoryModalClosed(true);
    };

    const loadingElements = () => {
        const fetchUsersPaginationNumber = async () => {
            await apiAdmin.fetchUsersPaginationNumber(setPaginationNumber, errorNotify);
        };

        const fetchUsersList = async () => {
            await apiAdmin.fetchUsersList(currentPage - 1, searchTerm, setUsers, errorNotify);
        };

        Promise.all([fetchUsersPaginationNumber(), fetchUsersList()]).then(() => {
            setIsLoading(false);
        });
    }
    useEffect(() => {
        setIsLoading(true);
        loadingElements();
    }, [isModalClosed, searchTerm]);

    const handleDeleteUser = async (userId) => {
        setUserId(userId);
        setIsConfirmModalVisible(true);
    };
    const handleConfirm = async () => {
        setIsLoadingDelete(true);
        await apiAdmin.deleteUser(userId, successNotify, errorNotify)
            .then(() => {
                setUserId(null)
                setIsLoadingDelete(false);
                setIsConfirmModalVisible(false);
                window.location.reload();
            });

    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
        setUserId(null);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        await apiAdmin.fetchUsersList(page - 1, searchTerm, setUsers, errorNotify);
    };

    const handleSearchInputChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="pb-16">
            <SearchInput text="Wyszukaj produkt..." onChange={handleSearchInputChange}/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-1 sm:px-2 py-3">
                            <div className="flex justify-center items-center">
                            Numer
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                            Imię nazwisko
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                            Numer telefonu
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                            Email
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                            Zamówienia
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                            Edytuj
                            </div>
                        </th>
                        <th scope="col" className="px-2 sm:px-6 py-3">
                            <div className="flex justify-center items-center">
                                Usuń
                            </div>

                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {users.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                            <th scope="row" className="px-2 sm:px-6 py-4 text-black">
                                {index + (currentPage - 1) * 12 + 1 + "."}
                            </th>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                {`${user.firstName} ${user.lastName}`}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                {user.phone}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                {user.email}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">

                                <span onClick={() => handleOpenHistoryModal(user.userId)}
                                      className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Historia</span>
                                {historyUserPhone === user.userId && (
                                    <OrdersHistoryModal userId={user.userId} onClose={handleCloseHistoryModal}/>)}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                <span onClick={() => handleOpenEditModal(user.userId)}
                                      className="font-medium text-yellow-400 no-underline hover:underline cursor-pointer">Edytuj</span>
                                {editedUserId === user.userId && (
                                    <EditUserModal userId={user.userId} onClose={handleCloseEditModal}/>)}
                                </div>
                            </td>
                            <td className="px-2 sm:px-6 py-4">
                                <div className="flex justify-center items-center">
                                {isAdmin ? (<button
                                    className="rounded-full bg-white p-2 hover:bg-red-200 mr-1"
                                    onClick={() => handleDeleteUser(user.userId)}
                                >
                                    <FaTrashAlt className="text-red-500"/>
                                </button>) : null}
                                </div>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <CustomConfirmModal
                visible={isConfirmModalVisible}
                message={`Czy na pewno chcesz usunąć tego użytkownika?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isLoading={isLoadingDelete}
            />
            <div className="w-full flex justify-center relative bottom-0 py-4">
                <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange}
                                  initialPage={currentPage}/>
            </div>
    </div>);
};

export default AdminUsers;