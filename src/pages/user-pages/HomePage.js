import React, {useEffect, useRef, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {homePage1, homePage2, homePage3} from '../../utils/props';
import Slider from 'react-slick';
import { Fade } from 'react-reveal';
import useAuth from "../../hooks/useAuth";
import LoginModal from "../../components/user/LoginModal";
import RegistrationModal from "../../components/user/RegistrationModal";
import {jwtDecode} from "jwt-decode";
import ForgotPasswordModal from "../../components/user/ForgotPasswordModal";

const HomePage = () => {
    const sliderRef = useRef(null);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const {isLoggedIn} = useAuth();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleWindowSizeChange = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1024) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const handleLoginClick = () => {
        setModalOpen('login');
    };

    const handleRegisterClick = () => {
        if (isLoggedIn) {
            setUserModalOpen(true);
        } else {
            setModalOpen('register');
        }
    };

    const handleForgotClick = () => {
        if (isLoggedIn) {
            setUserModalOpen(true);
        } else {
            setModalOpen('forgot');
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0); // Rozpocznij od pierwszego slajdu
        }
        handleWindowSizeChange(); // Wywołanie funkcji, aby ustawić początkową wartość

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);
    useEffect(() => {

    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="h-full bg-gradient-to-b from-[#EBEBEB] via-gray-300 to-[#EBEBEB] relative">
            <div className="lg:flex block">
                <div className="lg:w-1/4 p-4 bg-gray-400 w-full ">
                        {isSmallScreen && (
                            <Fade right>
                                <h2 className="text-gray-200 text-4xl lg:text-6xl text-center py-4 lg:py-12 lg:text-center" style={{fontFamily:'Lucida Console, serif' }}>Eggcellent Bakery</h2>
                            </Fade>
                        )}
                        {!isSmallScreen && (
                            <Fade left>
                                <h2 className="text-white text-6xl py-8 text-end" style={{fontFamily:'Lucida Console, serif' }}> Egg</h2>
                            </Fade>
                        )}
                    <Fade left>
                        <p className="p-4 text-2xl lg:text-3xl text-white text-center lg:text-start" style={{fontFamily:'Lucida Console, serif' }}>  Smak naszych wypieków to efekt nie tylko umiejętności, ale przede wszystkim miłości do doskonałości - w Eggcellent Bakery stawiamy na jakość, która czuje się w każdym kęsie.</p>
                    </Fade>
                    </div>
                <div className="w-full lg:w-3/4">

                        {!isSmallScreen && (
                            <Fade right>
                    <h2 className="text-[#707070] text-6xl text-start py-12" style={{fontFamily:'Lucida Console, serif' }}>cellent Bakery</h2>
                            </Fade>
                            )}
                            <div className="p-4 py-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
                                <Fade right>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <img src={homePage1} alt="Slide 1" className="block lg:h-[62vh] mx-auto" />
                                </div>
                                <div>
                                    <img src={homePage2} alt="Slide 2" className="block lg:h-[62vh] mx-auto " />
                                </div>
                            </Slider>
                                </Fade>
                        </div>


                </div>
            </div>
            <div className="flex lg:h-custom">
                <Fade left>
                <div className="w-1/4 p-4" style={{backgroundImage: `url(${homePage3})`, backgroundSize: 'cover'}}>
                </div>
                </Fade>
                <div className="w-3/4 bg-gray-400 flex flex-col justify-center">
                    <div className="p-2 md:p-4 lg:p-8 flex flex-col justify-center h-full">
                    <Fade right>
                        <h2 className="text-white text-4xl lg:text-6xl py-8 text-center" style={{fontFamily:'Lucida Console, serif' }}> Odkrywaj smaki </h2>
                        <p className="p-4 text-2xl lg:text-3xl text-white text-center" style={{fontFamily:'Lucida Console, serif' }}>
                            Odkryj nasze wyjątkowe wypieki, które są wynikiem połączenia tradycyjnych receptur
                            z nowoczesnym podejściem do pieczenia. Każdy produkt jest pieczony z najwyższej
                            jakości składników, z miłością i pasją.</p>
                        <p className="p-4 text-2xl lg:text-3xl text-white text-center" style={{fontFamily:'Lucida Console, serif' }}>
                            Załóż konto w naszej piekarni oraz zamawiaj najlepszej jakości produkty do woli, na kiedy tylko chcesz.
                            Odbieraj swoje zamówienia w wybrany dzień u nas podając swój numer telefonu.
                        </p>
                        <div className="flex justify-center p-4">
                            <button
                                type="button"
                                onClick={handleRegisterClick}
                                className="items-center text-gray-900 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-md lg:text-lg px-5 py-2.5 me-2 mb-2"
                                style={{ fontFamily: 'Lucida Console, serif' }}
                            >
                                Zarejestruj się!
                            </button>
                        </div>
                        </Fade>
                    </div>
                    {!isLoggedIn && modalOpen === 'login' &&
                        <LoginModal isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotClick}/>}
                    {!isLoggedIn && modalOpen === 'register' &&
                        <RegistrationModal isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}
                    {!isLoggedIn && modalOpen === 'forgot' &&
                        <ForgotPasswordModal isOpen={true} onClose={() => setModalOpen(null)} onForgotClick={handleForgotClick}/>}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
