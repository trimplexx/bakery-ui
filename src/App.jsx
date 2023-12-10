import {UserNavMenu} from './components/user/UserNavMenu';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/user-pages/HomePage";
import AboutPage from "./pages/user-pages/AboutPage";
import ContactPage from "./pages/user-pages/ContactPage";
import ProductsPage from "./pages/user-pages/ProductsPage";
import ShoppingCardPage from './pages/user-pages/ShoppingCardPage';
import NoPage from "./pages/user-pages/NoPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "./pages/admin-pages/AdminHome";
import {AdminMavMenu} from "./components/admin/AdminNavMenu";
import AdminProducts from "./pages/admin-pages/AdminProducts";
import AdminOrders from "./pages/admin-pages/AdminOrders";
import React from "react";
import useAuth from "./hooks/useAuth";
import AdminUsers from "./pages/admin-pages/AdminUsers";
import AdminProduction from "./pages/admin-pages/AdminProduction";
import AdminMakeOrder from "./pages/admin-pages/AdminMakeOrder";

function App() {
    const { isAdmin } = useAuth();

    const AdminPage = () => {
        return (
            <>
                <AdminMavMenu/>
                <div className="p-4 sm:ml-64">
                    <div className="sm:p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <Routes>
                            <Route path="HomePage" element={<AdminHome/>}/>
                            <Route path="Produkty" element={<AdminProducts/>}/>
                            <Route path="Zamowienia" element={<AdminOrders/>}/>
                            <Route path="Zamow" element={<AdminMakeOrder/>}/>
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
                    <Route path="/" element={<UserNavMenu/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="about" element={<AboutPage/>}/>
                        <Route path="contact" element={<ContactPage/>}/>
                        <Route path="products" element={<ProductsPage/>}/>
                        <Route path="shoppingCard" element={<ShoppingCardPage/>}/>
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