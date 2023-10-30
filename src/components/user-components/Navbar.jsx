import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './user-styles/Navbar.css';
import myImage from '../../graphics/BakeryLogo.png';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Login from './Login';
import Registration from './Registration';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

  const handleRegisterClick = () => {
    setModalOpen('register');
  };

  const handleLoginClick = () => {
    setModalOpen('login');
  };

  return (
      <>
        <nav>
          <Link to="/">
            <img src={myImage} alt="a" className="logo" />
          </Link>
          {menuOpen ?
              <FaTimes className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} /> :
              <FaBars className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} />
          }
          <ul className={`menu ${menuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/About">O nas</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">Kontakt</NavLink>
            </li>
            <li>
              <NavLink to="/Products">Produkty</NavLink>
            </li>
          </ul>
          <ul className={`icons-list ${menuOpen ? 'icons-open' : ''}`}>
            <li>
              <div onClick={handleLoginClick} className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                <FaUser />
              </div>
            </li>
            <li>
              <NavLink to="/ShoppingCard" className={`icon ${menuOpen ? 'icon-open' : ''}`}>
                <FaShoppingCart />
              </NavLink>
            </li>
          </ul>
        </nav>

        {modalOpen === 'login' && <Login isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick} />}
        {modalOpen === 'register' && <Registration isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick} />}

        <Outlet />
      </>
  );
};