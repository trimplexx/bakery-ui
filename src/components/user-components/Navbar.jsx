import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './user-styles/Navbar.css';
import myImage from '../../graphics/BakeryLogo.png';
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import Login from './Login'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

  return (
    <>
      <nav>
          <Link to="/">
            <img src={myImage} alt="a" className="logo" />
          </Link>
          <FaBars className="toggle_btn" onClick={() => setMenuOpen(!menuOpen)} />
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <NavLink to="/About">O nas</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">Kontakt</NavLink>
            </li>
            <li>
              <NavLink to="/Products">Produkty</NavLink>
            </li>
            <li>
              <div onClick={() => setModalOpen('login')} className="icon">
                <FaUser />
              </div>
            </li>
            <li>
              <NavLink to="/ShoppingCard" className="icon">
                <FaShoppingCart />
              </NavLink>
            </li>
          </ul>
      </nav>

      {modalOpen === 'login' && (
        <Login isOpen={true} onClose={() => setModalOpen(null)}  />
      )}

      <Outlet />
    </>
  );
};
