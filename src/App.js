import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {Suspense, lazy} from "react";
import useAuth from "./hooks/useAuth";
import ShoppingCardState from "./helpers/ShoppingCardState";
import {useCleanLocalStorage} from "./hooks/useCleanLocalStorage";
import LoadingComponent from "./components/common/LoadingComponent";
const UserNavMenu = lazy(() => import('./components/user/UserNavMenu'));
const AboutPage = lazy(() => import("./pages/user-pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/user-pages/ContactPage"));
const ProductsPage = lazy(() => import("./pages/user-pages/ProductsPage"));
const NoPage = lazy(() => import("./pages/user-pages/NoPage"));
const AdminHome = lazy(() => import("./pages/admin-pages/AdminHome"));
const AdminNavMenu = lazy(() => import("./components/admin/AdminNavMenu"));
const AdminProducts = lazy(() => import("./pages/admin-pages/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin-pages/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin-pages/AdminUsers"));
const AdminProduction = lazy(() => import("./pages/admin-pages/AdminProduction"));
const AdminMakeOrder = lazy(() => import("./pages/admin-pages/AdminMakeOrder"));
const SingleProductPage = lazy(() => import("./pages/user-pages/SingleProductPage"));
const OrderSumaryPage = lazy(() => import("./pages/user-pages/OrderSumaryPage"));
const Footer = lazy(() => import("./components/user/Footer"));
const HomePage = lazy(() => import("./pages/user-pages/HomePage"));
const ForgotPasswordPage = lazy(() => import("./pages/user-pages/ForgotPasswordPage"));
const UserVerifyPage = lazy(() => import("./pages/user-pages/UserVerifyPage"));
const GmailLoginSession = lazy(() => import("./pages/user-pages/SocialLoginSession"));
const FaqPage = lazy(() => import("./pages/user-pages/FaqPage"));
const LogoutPage = lazy(() => import("./pages/user-pages/LogoutPage"));
const PrivacyPolicy = lazy(() => import("./pages/user-pages/PrivacyPolicyPage"));
const StatutePage = lazy(() => import("./pages/user-pages/StatutePage"));

function App() {
    const {isAdmin} = useAuth();
    useCleanLocalStorage();

    return (
        <div className="flex flex-col min-h-screen">
            <ShoppingCardState>
                <BrowserRouter>
                     <UserNavMenu />
                    <Suspense fallback={<LoadingComponent/>}>
                        <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="onas" element={<AboutPage/>}/>
                                <Route path="kontakt" element={<ContactPage/>}/>
                                <Route path="produkty" element={<ProductsPage/>}/>
                                <Route path="polityka" element={<PrivacyPolicy/>}/>
                                <Route path="regulamin" element={<StatutePage/>}/>
                                <Route path="produkt/:productId" element={<SingleProductPage/>}/>
                                <Route path="podsumowanie" element={<OrderSumaryPage/>}/>
                                <Route path="odzyskiwanie-hasla/:token" element={<ForgotPasswordPage/>}/>
                                <Route path="weryfikacja/:token" element={<UserVerifyPage/>}/>
                                <Route path="social-session/:token/:refreshToken" element={<GmailLoginSession/>}/>
                                <Route path="faq" element={<FaqPage/>}/>
                                <Route path="logout" element={<LogoutPage/>}/>
                                <Route path="*" element={<NoPage/>}/>
                            {isAdmin ?
                                (<Route path="admin/*" element={
                                    <>
                                        <AdminNavMenu/>
                                        <div className="p-4 md:ml-64 max-h-screen sm:h-auto">
                                            <Routes>
                                                <Route path="home" element={<AdminHome/>}/>
                                                <Route path="produkty" element={<AdminProducts/>}/>
                                                <Route path="zamowienia" element={<AdminOrders/>}/>
                                                <Route path="zamow" element={<AdminMakeOrder/>}/>
                                                <Route path="uzytkownicy" element={<AdminUsers/>}/>
                                                <Route path="produkcja" element={<AdminProduction/>}/>
                                                <Route path="*" element={<Navigate to="/*"/>}></Route>
                                            </Routes>
                                        </div>
                                    </>
                                }/>) : null}
                        </Routes>
                        <Footer/>
                    </Suspense>
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
                </BrowserRouter>
            </ShoppingCardState>
        </div>
    );
}

export default App;

