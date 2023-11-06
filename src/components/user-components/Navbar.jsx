import React, {useEffect, useState} from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './user-styles/Navbar.css';
import myImage from '../../graphics/BakeryLogo.png';
import {FaUser, FaShoppingCart, FaBars, FaTimes, FaToolbox} from 'react-icons/fa';
import Login from './Login';
import Registration from './Registration';
import { motion } from 'framer-motion';
import {jwtDecode} from "jwt-decode";
import connectionUrl from "../../ConnectionUrl";
import axios from "axios";
import {toast} from "react-toastify";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const errorNotify = () => {
    if (!toast.isActive('logout')) {
      toast.error('Nastąpiło wylogowanie!', {
        toastId: 'logout',
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "errorToast",
      });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(connectionUrl.connectionUrlString + 'api/Auth/VerifyToken', {
        Token: token
      })
          .then(response => {
            const decodedToken = jwtDecode(token);
            setIsAdmin(decodedToken.Rank === "2");
          })
          .catch(error => {
            errorNotify();
            localStorage.removeItem('token');
          });
    }
  }, []);

  const handleRegisterClick = () => {
    setModalOpen('register');
  };

  const handleLoginClick = () => {
    setModalOpen('login');
  };

  const toggleVariants = {
    open: { rotate: 180, transition: { duration: 0.9 } },
    closed: { rotate: 0, transition: { duration: 0.9 } }
  };

  const linkVariants = {
    hover: { scale: 1.1, originX: 0, transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  };

  return (
      <>
        <nav>
          <Link to="/">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <img src={myImage} alt="a" className="logo" />
            </motion.div>
          </Link>
          <motion.div
              className="toggle_btn"
              onClick={() => setMenuOpen(!menuOpen)}
              variants={toggleVariants}
              animate={menuOpen ? "open" : "closed"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
          <ul className={`menu ${menuOpen ? 'open' : ''}`}>
            <li>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink to="/About">O nas</NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink to="/Contact">Kontakt</NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink to="/Products">Produkty</NavLink>
              </motion.div>
            </li>
          </ul>
          <ul className={`icons-list ${menuOpen ? 'icons-open' : ''}`}>
            <li>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <div onClick={handleLoginClick} className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                <FaUser />
              </div>
              </motion.div>
            </li>
            <li>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/ShoppingCard" className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                <FaShoppingCart />
              </NavLink>
              </motion.div>
            </li>
              {isAdmin && (
                  <li className="admin-icon">
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                      <NavLink to="/AdminPanel" className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                        <FaToolbox />
                      </NavLink>
                    </motion.div>
                  </li>
              )}
          </ul>
        </nav>

        {modalOpen === 'login' && <Login isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick} />}
        {modalOpen === 'register' && <Registration isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick} />}

        <Outlet />
      </>
  );
};