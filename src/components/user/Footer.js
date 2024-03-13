import React, {useEffect, useState} from 'react';
import { SocialIcon } from 'react-social-icons';
import {useLocation} from "react-router-dom";

const Footer = () => {
    const [isAdminPath, setIsAdminPath] = useState()
    const location = useLocation();

    useEffect(() => {
        setIsAdminPath(location.pathname.startsWith("/admin/"))
    }, [location]);


    return (
        <>{!isAdminPath ?
        <footer className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
                    <p className="py-1">Adres: ul. Przykładowa 123, Miasto</p>
                    <p className="py-1">Telefon: 123-456-789</p>
                    <p className="py-1">Email: kontakt@mojadomena.com</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Informacje prawne</h3>
                    <ul>
                        <li className="py-1"><a className="hover:text-[#FEA831]" href="/polityka-prywatnosci">Polityka prywatności</a></li>
                        <li className="py-1"><a className="hover:text-[#FEA831]" href="/regulamin">Regulamin</a></li>
                    </ul>
                </div>

                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Najczęstsze pytania</h3>
                    <a className="hover:text-[#FEA831]" href="/faq">FAQ</a>
                </div>

                <div className="flex items-center">
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
