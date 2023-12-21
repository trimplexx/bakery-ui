import {UserNavMenu} from './components/user/UserNavMenu';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/user-pages/HomePage";
import AboutPage from "./pages/user-pages/AboutPage";
import ContactPage from "./pages/user-pages/ContactPage";
import ProductsPage from "./pages/user-pages/ProductsPage";
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
import SingleProductPage from "./pages/user-pages/SingleProductPage";
import OrderSumaryPage from "./pages/user-pages/OrderSumaryPage";

function App() {
    const { isAdmin } = useAuth();

    const AdminPage = () => {
        return (
            <>
                <AdminMavMenu />
                <div className="p-4 sm:ml-64 max-h-screen sm:h-auto">
                        <Routes>
                            <Route path="home" element={<AdminHome/>}/>
                            <Route path="produkty" element={<AdminProducts/>}/>
                            <Route path="zamowienia" element={<AdminOrders/>}/>
                            <Route path="zamow" element={<AdminMakeOrder/>}/>
                            <Route path="uzytkownicy" element={<AdminUsers/>}/>
                            <Route path="produkcja" element={<AdminProduction/>}/>
                            <Route path="*" element={<Navigate to="/*" />} ></Route>
                        </Routes>
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
                        <Route path="product/:productId" element={<SingleProductPage />} />
                        <Route path="podsumowanie" element={<OrderSumaryPage />} />
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