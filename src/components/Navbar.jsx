import { Outlet, Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import myImage from './graphics/BakeryLogo.png';
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import React, { useState } from 'react';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
              <NavLink to="/Login" className="icon">
                <FaUser />
              </NavLink>
              <NavLink to="/ShoppingCard" className="icon">
                <FaShoppingCart />
              </NavLink>
            </li>
          </ul>
      </nav>
      <Outlet />
    </>
  );
};
