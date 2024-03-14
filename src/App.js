import {UserNavMenu} from './components/user/UserNavMenu';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AboutPage from "./pages/user-pages/AboutPage";
import ContactPage from "./pages/user-pages/ContactPage";
import ProductsPage from "./pages/user-pages/ProductsPage";
import NoPage from "./pages/user-pages/NoPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "./pages/admin-pages/AdminHome";
import {AdminNavMenu} from "./components/admin/AdminNavMenu";
import AdminProducts from "./pages/admin-pages/AdminProducts";
import AdminOrders from "./pages/admin-pages/AdminOrders";
import React, {} from "react";
import useAuth from "./hooks/useAuth";
import AdminUsers from "./pages/admin-pages/AdminUsers";
import AdminProduction from "./pages/admin-pages/AdminProduction";
import AdminMakeOrder from "./pages/admin-pages/AdminMakeOrder";
import SingleProductPage from "./pages/user-pages/SingleProductPage";
import OrderSumaryPage from "./pages/user-pages/OrderSumaryPage";
import Footer from "./components/user/Footer";
import HomePage from "./pages/user-pages/HomePage";
import ForgotPasswordPage from "./pages/user-pages/ForgotPasswordPage";
import UserVerifyPage from "./pages/user-pages/UserVerifyPage";
import GmailLoginSession from "./pages/user-pages/SocialLoginSession";
import ShoppingCardState from "./helpers/ShoppingCardState";
import {useCleanLocalStorage} from "./hooks/useCleanLocalStorage";
import FaqPage from "./pages/user-pages/FaqPage";

function App() {
    const { isAdmin } = useAuth();
    useCleanLocalStorage();

    return (
        <div className="flex flex-col min-h-screen">
            <ShoppingCardState>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserNavMenu/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="onas" element={<AboutPage/>}/>
                        <Route path="kontakt" element={<ContactPage/>}/>
                        <Route path="produkty" element={<ProductsPage/>}/>
                        <Route path="produkt/:productId" element={<SingleProductPage />} />
                        <Route path="podsumowanie" element={<OrderSumaryPage />} />
                        <Route path="odzyskiwanie-hasla/:token" element={<ForgotPasswordPage />} />
                        <Route path="weryfikacja/:token" element={<UserVerifyPage />} />
                        <Route path="social-session/:token/:refreshToken" element={<GmailLoginSession />} />
                        <Route path="faq" element={<FaqPage />} />
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                    {isAdmin ?
                        (<Route path="admin/*" element={
                            <>
                                <AdminNavMenu />
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
                        }/>) : null}

                </Routes>
                <Footer/>
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
            </ShoppingCardState>
        </div>
    );
}

export default App;