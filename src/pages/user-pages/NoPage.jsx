import React from 'react';
import { NavLink } from 'react-router-dom';
import './user-styles/NoPage.css';

const NoPage = () => {
    return (
        <div className="no-page">
            <div className="content">
                <p>Ups! Wygląda na to, że zgubiłeś się w naszej kuchni.</p>
                <NavLink to="/" className="home-button">Wróć do strony głównej</NavLink>
            </div>
        </div>
    );
};

export default NoPage;
