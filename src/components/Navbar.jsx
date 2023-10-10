import React from 'react'
import { Outlet, Link } from "react-router-dom";


export const Navbar = () => {
  return (
    <>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">O nas</Link>
      </li>
      <li>
        <Link to="/Contact">Kontakt</Link>
      </li>
      <li>
        <Link to="/Products">Produkty</Link>
      </li>
      <li>
        <Link to="/Login">Logowanie</Link>
      </li>
    </ul>
  </nav>

  <Outlet />
  </>
)
}

