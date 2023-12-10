import React, {useState} from 'react';
import {bakeryLogo} from "../../utils/props"
import {Link, NavLink, Outlet} from 'react-router-dom';
import '../../styles/navbar.css';
import {FaBars, FaShoppingCart, FaTimes, FaToolbox, FaUser} from 'react-icons/fa';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import {motion} from 'framer-motion';
import useAuth from "../../hooks/useAuth";
import useToastStorage from "../../hooks/useToastStorage";

export const UserNavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const { isAdmin, isLoggedIn } = useAuth();
    useToastStorage();

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
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><img src={bakeryLogo} alt="a"
                                                                                       className="logo"/>
            </motion.div>
        </Link>
            <motion.div className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} variants={toggleVariants}
                        animate={menuOpen ? "open" : "closed"}> {menuOpen ? <FaTimes/> : <FaBars/>} </motion.div>
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink to="/about">O
                        nas</NavLink></motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink
                        to="/contact">Kontakt</NavLink></motion.div>
                </li>
                <li>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><NavLink
                        to="/products">Produkty</NavLink></motion.div>
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
                        to="/ShoppingCardPage" className={`icon ${menuOpen ? 'icon-open' : ''}`}> <FaShoppingCart/>
                    </NavLink></motion.div>
                </li>
                {isAdmin && (<li className="admin-icon">
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap"><a href="/admin/home" className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                        <FaToolbox/> </a></motion.div>
                </li>)}
            </ul>
        </nav>

        {!isLoggedIn && modalOpen === 'login' &&
            <LoginModal isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick}/>}
        {!isLoggedIn && modalOpen === 'register' &&
            <RegistrationModal isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}

        <Outlet/>
    </>);
};