import {GiSlicedBread} from "react-icons/gi";
import {Link} from "react-router-dom";
import {bakeryLogo} from "../../utils/props";
import {RiDashboardFill} from "react-icons/ri";
import {FaShoppingCart, FaUsers, FaWarehouse, FaBreadSlice} from "react-icons/fa";
import React from "react";
import {ImExit} from "react-icons/im";
import AdminNavLink from "./AdminNavigationLink";

export const AdminMavMenu = () => {

    return (<>
        <nav className="flex justify-start top-0 z-50 w-full bg-[#c4c2c2] border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <div className="flex ml-2 md:mr-24">
                            <img src={bakeryLogo} alt="a" className="w-[65px] h-[60px] mr-6"/>
                            <span className="self-center text-xl text-amber-800 font-semibold ">Eggcellent Bakery</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#c4c2c2] border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto  flex flex-col">
                <ul className="space-y-2 font-medium mt-2">
                    <AdminNavLink to="/admin/home" text="Panel Główny" icon={RiDashboardFill}/>
                    <AdminNavLink to="/admin/produkty" text="Produkty" icon={GiSlicedBread}/>
                    <AdminNavLink to="/admin/zamowienia" text="Zamówienia" icon={FaShoppingCart}/>
                    <AdminNavLink to="/admin/zamow" text="Wykonaj zamówienie" icon={FaBreadSlice}/>
                    <AdminNavLink to="/admin/produkcja" text="Produkcja" icon={FaWarehouse}/>
                    <AdminNavLink to="/admin/uzytkownicy" text="Użytkownicy" icon={FaUsers}/>
                </ul>
                <ul className="space-y-2 font-medium mt-auto">
                    <li>
                        <Link to="/"
                              className="flex items-center p-2 text-gray-900 text-lg rounded-lg hover:bg-gray-100 group">
                            <ImExit/>
                            <span className="ml-3">Wyjście</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>


    </>);
};