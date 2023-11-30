import './App.css';
import {Navbar} from './components/user-components/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/user-pages/Home";
import About from "./pages/user-pages/About";
import Contact from "./pages/user-pages/Contact";
import Products from "./pages/user-pages/Products";
import ShoppingCard from './components/user-components/ShoppingCard';
import NoPage from "./pages/user-pages/NoPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "./pages/admin-pages/AdminHome";
import {AdminMavMenu} from "./components/admin-components/AdminNavMenu";
import AdminProducts from "./pages/admin-pages/AdminProducts";
import AdminOrders from "./pages/admin-pages/AdminOrders";
import React from "react";
import useAuth from "./helpers/useAuth";
import AdminUsers from "./pages/admin-pages/AdminUsers";
import AdminProduction from "./pages/admin-pages/AdminProduction";

function App() {
    const { isAdmin } = useAuth();

    const AdminPage = () => {
        return (
            <>
                <AdminMavMenu/>
                <div className="p-4 sm:ml-64">
                    <div className="sm:p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <Routes>
                            <Route path="Home" element={<AdminHome/>}/>
                            <Route path="Produkty" element={<AdminProducts/>}/>
                            <Route path="Zamowienia" element={<AdminOrders/>}/>
                            <Route path="Uzytkownicy" element={<AdminUsers/>}/>
                            <Route path="Produkcja" element={<AdminProduction/>}/>
                            <Route path="*" element={<Navigate to="/*" />} ></Route>
                        </Routes>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="shoppingCard" element={<ShoppingCard/>}/>
                    </Route>
                    {isAdmin && (<Route path="admin/*" element={<AdminPage/>}/>)}
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
                limit={2}
            />
        </div>
    );
}

export default App;