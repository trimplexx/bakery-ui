import React, {useEffect, useState} from 'react';
import {Link, NavLink, Outlet} from 'react-router-dom';
import './user-styles/Navbar.css';
import myImage from '../../graphics/BakeryLogo.png';
import {FaBars, FaShoppingCart, FaTimes, FaToolbox, FaUser} from 'react-icons/fa';
import Login from './Login';
import Registration from './Registration';
import {motion} from 'framer-motion';
import { errorNotifyStorage, successNotifyStorage} from "../../helpers/ToastNotifications";
import useAuth from "../../helpers/useAuth";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const { isAdmin, isLoggedIn } = useAuth();

    useEffect(() => {
        const successNotificationContent = localStorage.getItem('successNotifyStorage');
        const errorNotificationContent = localStorage.getItem('errorNotifyStorage');
        if (successNotificationContent) {
            successNotifyStorage();
            localStorage.removeItem('successNotifyStorage');
        }
        if (errorNotificationContent) {
            errorNotifyStorage();
            localStorage.removeItem('errorNotifyStorage');
        }
        successNotifyStorage();
    }, []);

    const handleRegisterClick = () => {
        setModalOpen('register');
    };

    const handleLoginClick = () => {
        setModalOpen('login');
    };


    const toggleVariants = {
        open: {rotate: 180, transition: {duration: 0.9}}, closed: {rotate: 0, transition: {duration: 0.9}}
    };

    const linkVariants = {
        hover: {scale: 1.1, originX: 0, transition: {duration: 0.3}}, tap: {scale: 0.9}
    };


    return (<>
        <nav id="navbar"><Link to="/">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><img src={myImage} alt="a"
                                                                                       className="logo"/>
            </motion.div>
        </Link>
            <motion.div className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} variants={toggleVariants}
                        animate={menuOpen ? "open" : "closed"}> {menuOpen ? <FaTimes/> : <FaBars/>} </motion.div>
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink to="/About">O
                        nas</NavLink></motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink
                        to="/Contact">Kontakt</NavLink></motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink
                        to="/Products">Produkty</NavLink></motion.div>
                </li>
            </ul>
            <ul className={`icons-list ${menuOpen ? 'icons-open' : ''}`}>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                        <div onClick={handleLoginClick} className={`icon ${menuOpen ? 'icon-open' : ''}`}><FaUser/>
                        </div>
                    </motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink
                        to="/ShoppingCard" className={`icon ${menuOpen ? 'icon-open' : ''}`}> <FaShoppingCart/>
                    </NavLink></motion.div>
                </li>
                {isAdmin && (<li className="admin-icon">
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><a href="/Admin/Home" className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                        <FaToolbox/> </a></motion.div>
                </li>)}
            </ul>
        </nav>

        {!isLoggedIn && modalOpen === 'login' &&
            <Login isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick}/>}
        {!isLoggedIn && modalOpen === 'register' &&
            <Registration isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}

        <Outlet/>
    </>);
};