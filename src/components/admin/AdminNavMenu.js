import {GiSlicedBread} from "react-icons/gi";
import {bakeryLogo} from "../../utils/props";
import {RiDashboardFill} from "react-icons/ri";
import {FaBreadSlice, FaShoppingCart, FaUsers, FaWarehouse} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {ImExit} from "react-icons/im";
import AdminNavLink from "./AdminNavigationLink";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/interceptor";

const AdminNavMenu = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useAuth();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        const sidebar = document.getElementById("logo-sidebar");
        if (sidebar) {
            sidebar.classList.toggle("-translate-x-full");
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.head('api/AdminMainPage/checkIfAdmin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
            }).catch(() => {
            });
        }
    }, []);

    const closeMenu = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            <nav className="flex justify-start top-0 z-50 w-full bg-gray-200 border-b border-gray-200 sticky-top">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={toggleSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fillRule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="flex ml-2 md:mr-24">
                                <img src={bakeryLogo} alt="a" className="w-[80px] h-[60px] mr-6"/>
                                <span
                                    className="self-center text-3xl text-yellow-orange-400 font-[Anuphan] font-bold">Admin Panel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar"
                   className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-200 border-r border-gray-200 md:translate-x-0 ${sidebarOpen ? '' : '-translate-x-full'}`}
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto  flex flex-col">
                    <ul className="space-y-2 font-medium mt-2">
                        <AdminNavLink to="/admin/home" text="Panel Główny" onClick={closeMenu} icon={RiDashboardFill}/>
                        <AdminNavLink to="/admin/produkty" text="Produkty" onClick={closeMenu} icon={GiSlicedBread}/>
                        <AdminNavLink to="/admin/zamowienia" text="Zamówienia" onClick={closeMenu} icon={FaShoppingCart}/>
                        <AdminNavLink to="/admin/zamow" text="Wykonaj zamówienie" onClick={closeMenu} icon={FaBreadSlice}/>
                        <AdminNavLink to="/admin/produkcja" text="Produkcja"  onClick={closeMenu} icon={FaWarehouse}/>
                        <AdminNavLink to="/admin/uzytkownicy" text="Użytkownicy" onClick={closeMenu} icon={FaUsers}/>
                        <AdminNavLink to="/" text="Wyjście" icon={ImExit}/>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default AdminNavMenu;
