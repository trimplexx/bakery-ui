import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Fade} from 'react-reveal';
import {About1, About2, About3} from "../../utils/props";
import Slider from "react-slick";

const AboutPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
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
        <div
            className="h-full bg-gradient-to-b from-[#EBEBEB] via-gray-300 to-[#EBEBEB] relative flex-grow py-auto mt-auto items-center justify-center flex py-2">
            <div className="grid grid-cols-1 xl:grid-cols-3 ">
                <div className="w-full h-full p-8 flex-col flex justify-center">
                    <div className="px-4 pb-4">
                        <Fade left>
                            <Slider {...settings}>
                                <div>
                                    <img src={About1} alt="Slide 1" className="mx-auto"/>
                                </div>
                                <div>
                                    <img src={About2} alt="Slide 2" className="mx-auto"/>
                                </div>
                                <div>
                                    <img src={About3} alt="Slide 2" className="mx-auto"/>
                                </div>
                            </Slider>
                        </Fade>
                    </div>
                </div>

                <div
                    className="w-full bg-gray-400 p-4 sm:px-10 xl:px-16 2xl:px-40 rounded-2xl xl:rounded-none xl:rounded-l-2xl  xl:col-span-2 xl:col-start-2">
                    <Fade top>
                        <h2 className="text-white text-4xl lg:text-5xl py-8 text-center"
                            style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>
                            Witajcie w piekarni "Trzeba chleba"
                        </h2>
                    </Fade>

                    <Fade right>
                        <p className="p-4 lg:text-lg text-white text-center"
                           style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>
                            Jesteśmy nowo otwartą piekarnią zlokalizowaną w samym sercu Katowic. Nasza piekarnia to
                            miejsce, gdzie tradycja spotyka się z nowoczesnością, a pasja do pieczenia przenika każdy
                            wypiekany przez nas bochenek.<br/><br/>
                            Nasza piekarnia to marzenie, które stało się rzeczywistością. Założona przez Bartka
                            Krawczyka, doświadczonego profesjonalistę w branży gastronomicznej, “Trzeba chleba” to wynik
                            lat pracy i doświadczeń zdobytych w różnych aspektach gastronomii. Od pracy w piekarniach,
                            przez restauracje, aż po otwarcie własnego lokalu - każdy z tych etapów przyczynił się do
                            powstania miejsca, jakim jest dzisiaj nasza piekarnia.
                            <br/><br/>
                            Specjalizujemy się w produkcji różnego rodzaju pieczywa - od tradycyjnego chleba pszennego i
                            żytniego, przez bułki, bagietki, aż po ciasta i słodkości. Wszystkie nasze produkty są
                            wypiekane na miejscu, co gwarantuje ich świeżość i najwyższą jakość. Bartek, z jego
                            doświadczeniem i pasją, osobiście nadzoruje każdy etap produkcji, aby zapewnić, że każdy kęs
                            naszego pieczywa to prawdziwa uczta dla podniebienia.
                            <br/><br/>
                            Rozumiemy, jak ważny jest czas naszych klientów. Dlatego oferujemy możliwość składania
                            zamówień przez naszą stronę internetową. Wystarczy kilka kliknięć, aby zamówić swoje
                            ulubione pieczywo i odebrać je bezpośrednio z naszej piekarni.
                            <br/><br/><br/>
                            Zapraszamy do odwiedzenia naszej piekarni i spróbowania naszych wypieków. Jesteśmy
                            przekonani, że po pierwszym kęsie naszego chleba, zrozumiecie, dlaczego nasza piekarnia
                            nazywa się “Trzeba chleba”.
                        </p>
                    </Fade>
                    <Fade bottom>
                        <h2 className="text-white lg:text-xl py-2 text-end"
                            style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>Smacznego!</h2>
                        <h2 className="text-white lg:text-xl py-2 text-end"
                            style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>Zespół piekarni "Trzeba chleba"</h2>
                    </Fade>
                </div>
            </div>
        </div>
    );

};

export default AboutPage;

