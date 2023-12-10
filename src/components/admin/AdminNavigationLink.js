import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavLink = ({ to, text, icon }) => {
    return (
        <li>
            <NavLink to={to} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                {React.createElement(icon)}
                <span className="ml-3">{text}</span>
            </NavLink>
        </li>
    );
};

export default AdminNavLink;
