import React, {useEffect, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {homePage1, homePage2, homePage3} from '../../utils/props';
import Slider from 'react-slick';
import {Fade} from 'react-reveal';
import useAuth from "../../hooks/useAuth";
import apiUser from "../../utils/apiUser";
import LoadingComponent from "../../components/common/LoadingComponent";
import InstagramPosts from "../../components/user/InstagramPosts";
import SecSideMainPage from "../../components/user/SecSideMainPage";

const HomePage = () => {
    const [, setUserModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [instagramData, setInstagramData] = useState([]);
    const {isLoggedIn} = useAuth();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleWindowSizeChange = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1024) {
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
        setIsLoading(true);
        apiUser.fetchInstagramPosts(setInstagramData, setIsLoading)
        handleWindowSizeChange(); // Wywołanie funkcji, aby ustawić początkową wartość
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        responsive: [{
            breakpoint: 768, settings: {
                arrows: false,
            },
        },],
    };

    return (
        <div className="h-full bg-gradient-to-b from-[#EBEBEB] via-gray-300 to-[#EBEBEB] relative">
            <div className="lg:flex block">
                <div className="w-full lg:w-2/5 p-4 bg-gray-400 lg:min-h-[85vh] ">
                    {!isSmallScreen && (<Fade left>
                        <h2 className="text-white text-6xl text-end"
                            style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>Trzeba</h2>
                    </Fade>)}
                    <Fade left>
                        <p className="text-xl md:text-2xl lg:text-2xl px-5 sm:px-20 lg:px-2 xl:px-4 2xl:px-10 text-white text-center py-4"
                           style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}
                        ><strong className="text-3xl">Witaj w
                            piekarni "Trzeba Chleba"!</strong><br/>
                        </p>
                        <p className="text-xl md:text-2xl lg:text-2xl px-5 sm:px-20 lg:px-2 xl:px-4 2xl:px-20 text-white text-center py-2"
                           style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}
                        >Tutaj każdy kęs to historia pasji i staranności. Nasz zespół to pasjonaci, dla których pieczenie to sztuka.
                            Nasze wypieki są niepowtarzalne – pełne aromatu i chrupiące na zewnątrz, a miękkie w środku. Zapraszamy
                            do naszej piekarni, gdzie jakość i doświadczenie stawiamy na pierwszym miejscu. Odkryj,
                            jak pieczenie może być pasją, a każdy chleb smakować jak najlepszy wybór dla Twojego
                            podniebienia.<br/><br/> <br/> <strong className="text-red-600">Strona jest w wersji testowej pod przyszły użytek.</strong>
                        </p>
                    </Fade>
                </div>
                <div className="w-full lg:w-3/5">
                    {!isSmallScreen && (<Fade right>
                        <h2 className="text-[#707070] text-6xl text-start py-4 lg:px-2 xl:ml-2"
                            style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}> Chleba</h2>
                    </Fade>)}
                    <div className="md:px-8 md:pb-8 lg:px-10 lg:pb-10 w-full h-4/5 2xl:h-fit flex-col flex justify-center lg:pt-0 py-6">
                        <Fade right>
                            <Slider {...settings}>
                                <div>
                                    <img src={homePage1} alt="Slide 1" className="block mx-auto px-4"/>
                                </div>
                                <div>
                                    <img src={homePage2} alt="Slide 2" className="block mx-auto px-4 "/>
                                </div>
                                <div>
                                    <img src={homePage3} alt="Slide 2" className="block mx-auto px-4 "/>
                                </div>
                            </Slider>
                        </Fade>
                    </div>
                </div>
            </div>
            {!isSmallScreen ?
                <div className="lg:flex block">
                    <InstagramPosts instagramData={instagramData}/>
                    <SecSideMainPage
                        isLoggedIn={isLoggedIn}
                        modalOpen={modalOpen}
                        handleRegisterClick={handleRegisterClick}
                        handleForgotClick={handleForgotClick}
                        handleLoginClick={handleLoginClick}
                        setModalOpen={setModalOpen}
                    />
                </div> :
                <div className="lg:flex block">
                    <SecSideMainPage
                        isLoggedIn={isLoggedIn}
                        modalOpen={modalOpen}
                        handleRegisterClick={handleRegisterClick}
                        handleForgotClick={handleForgotClick}
                        handleLoginClick={handleLoginClick}
                        setModalOpen={setModalOpen}
                    />
                    <InstagramPosts instagramData={instagramData}/>
                </div>}
        </div>);
};

export default HomePage;
