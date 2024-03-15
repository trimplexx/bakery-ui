import React, {useEffect, useState} from 'react';
import { SocialIcon } from 'react-social-icons';
import {NavLink, useLocation} from "react-router-dom";

const Footer = () => {
    const [isAdminPath, setIsAdminPath] = useState();
    const location = useLocation();

    useEffect(() => {
        setIsAdminPath(location.pathname.toLowerCase().startsWith("/admin/"));
    }, [location]);

    return (
        <>{!isAdminPath ?
        <footer className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
                    <p className="text-gray-700 py-1" >
                        <strong>Adres:</strong> ul. Plebiscytowa 7, 40-035 Katowice</p>
                    <p className="text-gray-700 py-1" >
                        <strong>Telefon:</strong> 123-456-789</p>
                    <p className="text-gray-700 py-1" >
                        <strong>Email:</strong> kontakt@piekarnia.com</p>
                </div>

                <div className="mb-4 lg:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Informacje prawne</h3>
                    <ul>
                        <li className="py-1"><NavLink className="hover:text-[#FEA831]" to="/polityka-prywatnosci">Polityka prywatności</NavLink></li>
                        <li className="py-1"><NavLink className="hover:text-[#FEA831]" to="/regulamin">Regulamin</NavLink></li>
                    </ul>
                </div>

                <div className="mb-4 lg:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Najczęstsze pytania</h3>
                    <NavLink className="hover:text-[#FEA831]" to="/faq">FAQ</NavLink>
                </div>

                <div className="flex justify-center">
                    <div className="mr-4">
                        <SocialIcon url="https://www.facebook.com" />
                    </div>
                    <div className="mr-4">
                        <SocialIcon url="https://www.tiktok.com" />
                    </div>
                    <div>
                        <SocialIcon url="https://www.instagram.com"/>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center p-2">
                <p>&copy; 2024 Trzeba Chleba. Wszelkie prawa zastrzeżone.</p>
            </div>
        </footer> : null}
        </>
    );
};

export default Footer;
