import React from "react";
import "./user-styles/Registration.css";
import { FaTimes } from "react-icons/fa";
import './user-styles/Registration.css'

const Registration = ({ onClose }) => {

  return (
    <div className="modal">
      <form className="registration-form">
        <FaTimes onClick={onClose} />
        <h2>Rejestracja</h2>
        <label htmlFor="firstName">Imię:</label>
        <input type="text" id="firstName" required />

        <label htmlFor="lastName">Nazwisko:</label>
        <input type="text" id="lastName" required />

        <label htmlFor="phone">Telefon:</label>
        <input type="tel" id="phone" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />

        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" required />

        <label htmlFor="confirmPassword">Powtórz hasło:</label>
        <input type="password" id="confirmPassword" required />

        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Registration;
