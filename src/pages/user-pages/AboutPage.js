import React, {useEffect, useRef, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {About1, About2, About3, homePage1, homePage2, homePage3} from '../../utils/props';
import Slider from 'react-slick';
import { Fade } from 'react-reveal';
import useAuth from "../../hooks/useAuth";
import LoginModal from "../../components/user/LoginModal";
import RegistrationModal from "../../components/user/RegistrationModal";

const AboutPage = () => {
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
                <div className="lg:w-1/3 px-4 w-full ">
                    <div className="px-4 pb-4">
                        <Fade right>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <img src={About1} alt="Slide 1" className="block h-custom lg:h-full mx-auto" />
                                </div>
                                <div>
                                    <img src={About2} alt="Slide 2" className="block h-custom lg:h-full mx-auto " />
                                </div>
                                <div>
                                    <img src={About3} alt="Slide 2" className="block h-custom lg:h-full mx-auto " />
                                </div>
                            </Slider>
                        </Fade>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 bg-gray-400">
                    <Fade top>
                        <h2 className="text-white text-4xl lg:text-5xl py-8 text-center" style={{fontFamily:'Lucida Console, serif' }}>
                            Witajcie w Eggcellent Bakery!
                        </h2>
                    </Fade>

                    <Fade right>
                        <p className="p-4 lg:text-lg text-white text-center lg:text-start" style={{fontFamily:'Lucida Console, serif' }}>
                            Jesteśmy pasjonatami smaku i tradycji, stworzyliśmy miejsce, gdzie zapach świeżo upieczonych wypieków mieszka wraz z radosnym brzęczeniem rozmów. Nasza historia zaczęła się od miłości do doskonałego smaku, pasji do precyzji i zamiłowania do tradycyjnych receptur. Nasza piekarnia to nie tylko miejsce, gdzie wypiekamy najwyższej jakości chleby i wypieki, ale także spotkania, które łączą ludzi.
                            <br /><br />
                            W Eggcellent Bakery każdy dzień rozpoczynamy od świeżości. Nasze produkty są wypiekane z najwyższej jakości składników, a każdy chleb, bułka czy ciasto jest rezultatem starannego procesu, w którym troszczymy się o każdy detal. Ponadto, stawiamy na innowacyjność, eksperymentujemy z smakami i przywracamy do życia tradycyjne przepisy, by zaskoczyć Wasze podniebienia.
                            <br /><br />
                            Nasz zespół to grupa pasjonatów, którzy oddają serce i duszę każdemu wypiekowi. Każdy uśmiech klienta po skosztowaniu naszych wyrobów jest dla nas motywacją do dalszej doskonałości. Chcemy, aby każda wizyta w Eggcellent Bakery była niezapomnianym doświadczeniem smakowym i kulinarną podróżą.
                            <br /><br />
                            Jesteśmy dumni z tego, co robimy, i nieustannie dążymy do doskonałości. Dziękujemy, że jesteście z nami w tej kulinarniej podróży!
                            <br /><br />
                            Serdecznie zapraszamy do naszej piekarni, abyście mogli poczuć magię smaku i aromatu w każdym kęsie.
                        </p>
                    </Fade>

                    <Fade bottom>
                        <h2 className="text-white lg:text-xl py-2 text-end" style={{fontFamily:'Lucida Console, serif' }}>Smacznego!</h2>
                        <h2 className="text-white lg:text-xl py-2 text-end" style={{fontFamily:'Lucida Console, serif' }}>Zespół Eggcellent Bakery</h2>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
