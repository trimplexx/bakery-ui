import React, {useContext, useEffect, useState} from 'react';
import {bakeryLogo} from "../../utils/props"
import {Link, NavLink, Outlet, useLocation} from 'react-router-dom';
import '../../styles/userNavLink.css';
import {FaBars, FaShoppingCart, FaTimes, FaToolbox, FaUser} from 'react-icons/fa';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import {motion} from 'framer-motion';
import useAuth from "../../hooks/useAuth";
import useToastStorage from "../../hooks/useToastStorage";
import ShoppingCard from "./ShoppingCard";
import UserModal from "./UserModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import {ShoppingCardContext} from "../../helpers/ShoppingCardState";

const UserNavMenu = () => {
    const [isAdminPath, setIsAdminPath] = useState();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const {isAdmin, isLoggedIn} = useAuth();
    const {isCardChange} = useContext(ShoppingCardContext);
    const [cartCount, setCartCount] = useState(0);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [storedDates, setStoredDates] = useState([]);
    useToastStorage();

    useEffect(() => {
        setIsAdminPath(location.pathname.toLowerCase().startsWith("/admin/"));
    }, [location]);

    const handleRegisterClick = () => {
        setModalOpen('register');
    };

    const handleLoginClick = () => {
        if (isLoggedIn) {
            setUserModalOpen(true);
        } else {
            setModalOpen('login');
        }
    };

    const handleCartIconClick = () => {
        setSidebarOpen(true);
    };

    const handleForgotClick = () => {
        if (isLoggedIn) {
            setUserModalOpen(true);
        } else {
            setModalOpen('forgot');
        }
    };

    useEffect(() => {
        const storedOption = localStorage.getItem('selectedOption');
        if (storedOption) {
            // Sprawdź wszystkie klucze w localStorage
            for (const key in localStorage) {
                // Sprawdź, czy klucz pasuje do formatu "RRRR-MM-DD"
                if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
                    const storedKeys = Object.keys(localStorage);
                    const dateKeys = storedKeys.filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
                    setStoredDates(dateKeys.map(key => ({value: key, label: key})));
                    const foundOption = storedDates.find(option => option.value === storedOption);
                    if (foundOption) {
                        const items = JSON.parse(localStorage.getItem(foundOption.value));
                        const itemCount = items ? items.length : 0;
                        setCartCount(itemCount);
                    }
                    else
                    {
                        const items = JSON.parse(localStorage.getItem(key));
                        const itemCount = items ? items.length : 0;
                        setCartCount(itemCount);
                    }
                }
            }
        } else {
            setCartCount(0)
        }
    }, [isCardChange]);

    const toggleVariants = {
        open: {rotate: 180, transition: {duration: 0.3}}, closed: {rotate: 0, transition: {duration: 0.3}}
    };

    const linkVariants = {
        hover: {scale: 1.1, originX: 0, transition: {duration: 0.05}}, tap: {scale: 0.9}
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        !isAdminPath ? <>
        <nav id="navbar"><Link to="/">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><img src={bakeryLogo} alt="a"
                                                                                       className="w-26 sm:w-42 h-20 sm:h-32 p-2"/>
            </motion.div>
        </Link>
            <motion.div className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} variants={toggleVariants}
                        animate={menuOpen ? "open" : "closed"}> {menuOpen ? <FaTimes/> : <FaBars/>} </motion.div>
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                        <NavLink to="/produkty" onClick={closeMenu}>Produkty</NavLink>
                    </motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" onClick={closeMenu}><NavLink to="/onas">O
                        nas</NavLink></motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" onClick={closeMenu}><NavLink
                        to="/kontakt">Kontakt</NavLink></motion.div>
                </li>
            </ul>
            <ul className={`icons-list ${menuOpen ? 'icons-open' : ''}`}>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" onClick={closeMenu}>
                        <div onClick={handleLoginClick} className={`icon ${menuOpen ? 'icon-open' : ''}`}><FaUser/>
                        </div>
                    </motion.div>
                </li>
                <li>
                    <div onClick={handleCartIconClick} className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" onClick={closeMenu}>
                            <FaShoppingCart/>
                        </motion.div>
                        {cartCount > 0 &&
                            <span className="p-2 bg-yellow-orange-400 text-sm font-bold text-white absolute flex items-center justify-center h-5 w-5" style={{right: 0, bottom: 4, borderRadius: '50%'}}>
            {cartCount}
        </span>
                        }
                    </div>
                </li>

                {isAdmin ? (<li className="admin-icon">
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink to="/admin/home"
                                                                                                   className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                        <FaToolbox/> </NavLink></motion.div>
                </li>) : null}
            </ul>
        </nav>
        <ShoppingCard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        {!isLoggedIn && modalOpen === 'login' &&
            <LoginModal isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick}
                        onForgotPasswordClick={handleForgotClick}/>}
        {!isLoggedIn && modalOpen === 'register' &&
            <RegistrationModal isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}
        {!isLoggedIn && modalOpen === 'forgot' &&
            <ForgotPasswordModal isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}

        {isLoggedIn && userModalOpen && (
            <UserModal isOpen={true} onClose={() => setUserModalOpen(false)}/>
        )}

        <Outlet/>
    </>
     : null);
};
export default UserNavMenu;