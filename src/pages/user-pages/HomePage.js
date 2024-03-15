import React, {useEffect, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {homePage1, homePage2} from '../../utils/props';
import Slider from 'react-slick';
import {Fade} from 'react-reveal';
import useAuth from "../../hooks/useAuth";
import apiUser from "../../utils/apiUser";
import LoadingComponent from "../../components/common/LoadingComponent";
import InstagramPosts from "../../components/user/InstagramPosts";
import SecSideMainPage from "../../components/user/SecSideMainPage";

const HomePage = () => {
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [instagramData, setInstagramData] = useState([]);
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

    return (isLoading ? (<div className="h-auto justify-center flex flex-grow"><LoadingComponent/></div>) :
        <div className="h-full bg-gradient-to-b from-[#EBEBEB] via-gray-300 to-[#EBEBEB] relative">
            <div className="lg:flex block">
                <div className="w-full lg:w-2/5 p-4 bg-gray-400 lg:min-h-[85vh]">
                    {!isSmallScreen && (<Fade left>
                        <h2 className="text-white text-6xl py-8 text-end"
                            style={{fontFamily: 'Lucida Console, serif'}}>Trzeba</h2>
                    </Fade>)}
                    <Fade left>
                        <p className="p-4 text-xl lg:text-2xl lg:px-6 text-white text-center py-10"
                           style={{fontFamily: 'Lucida Console, serif'}}><strong className="text-3xl">Witaj w
                            piekarni "Trzeba Chleba"!</strong> <br/><br/>Tutaj każdy kęs to historia pasji i
                            staranności. Nasz zespół to pasjonaci, dla których pieczenie to sztuka. Nasze wypieki są
                            niepowtarzalne – pełne aromatu i chrupiące na zewnątrz, a miękkie w środku. Zapraszamy
                            do naszej piekarni, gdzie jakość i doświadczenie stawiamy na pierwszym miejscu. Odkryj,
                            jak pieczenie może być pasją, a każdy chleb smakować jak najlepszy wybór dla Twojego
                            podniebienia.
                        </p>
                    </Fade>
                </div>
                <div className="w-full lg:w-3/5">
                    {!isSmallScreen && (<Fade right>
                        <h2 className="text-[#707070] text-6xl text-start py-12 ml-2"
                            style={{fontFamily: 'Lucida Console, serif'}}> Chleba</h2>
                    </Fade>)}
                    <div className="p-4 py-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
                        <Fade right>
                            <Slider {...settings}>
                                <div>
                                    <img src={homePage1} alt="Slide 1" className="block mx-auto px-4"/>
                                </div>
                                <div>
                                    <img src={homePage2} alt="Slide 2" className="block mx-auto px-4 "/>
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
