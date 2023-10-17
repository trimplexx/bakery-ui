import React, { useState } from "react";
import "./user-styles/Login.css";
import { FaTimes } from "react-icons/fa";
import Registration from "./Registration";

const Login = ({ isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState("login");

  if (!isOpen) {
    return null;
  }

  const handleRegisterClick = () => {
    setModalOpen("register");
  };

  const handleModalClose = () => {
    setModalOpen('login');
    onClose();
  };


  return (
    <div className="modal">
      {modalOpen === "login" ? (
        <form className="login-form">
          <FaTimes onClick={onClose} />
          <h2>Logowanie</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />

          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" required />
          <span className="forgot-password">Zapomniałeś hasła?</span>
          <button type="submit">Zaloguj się</button>
          <p>
        Nie posiadasz konta? 
        <span onClick={handleRegisterClick} > Zarejestruj się.
        </span>
      </p>
        </form>
      ) : (
        <Registration onClose={() => handleModalClose("login")} />
      )}

      
    </div>
  );
};

export default Login;
