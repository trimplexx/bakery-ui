import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

const AdminNavLink = ({to, text, icon: Icon, onClick}) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={`flex items-center text-lg p-2 rounded-lg hover:bg-gray-100 group ${isActive ? 'active bg-gray-100' : ''}`}
            >
                <Icon/>
                <span className="ml-3">{text}</span>
            </NavLink>
        </li>
    );
};

export default AdminNavLink;
