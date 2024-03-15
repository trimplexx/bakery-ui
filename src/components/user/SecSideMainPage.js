import {Fade} from "react-reveal";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import {NavLink} from "react-router-dom";

const SecSideMainPage = ({
                             isLoggedIn,
                             modalOpen,
                             handleRegisterClick,
                             handleLoginClick,
                             handleForgotClick,
                             setModalOpen
                         }) => {
    return (<div className="w-full lg:w-3/5 bg-gray-400 flex flex-col lg:min-h-[85vh] py-10">
            <div className="p-2 md:p-4 lg:p-8 flex flex-col">
                <Fade right>
                    <h2 className="text-white text-3xl lg:text-4xl py-8 text-center"
                        style={{fontFamily: 'Lucida Console, serif'}}> Odkrywaj smaki </h2>
                    <p className="p-4 text-xl lg:text-2xl lg:px-8 text-white text-center"
                       style={{fontFamily: 'Lucida Console, serif'}}>
                        Odkryj nasze wyjątkowe wypieki, które są wynikiem połączenia tradycyjnych receptur
                        z nowoczesnym podejściem do pieczenia. Każdy produkt jest pieczony z najwyższej
                        jakości składników, z miłością i pasją.<br/><br/>
                        Załóż konto w naszej piekarni oraz zamawiaj najlepszej jakości produkty do woli, na kiedy tylko
                        chcesz.
                        Odbieraj swoje zamówienia w wybrany dzień u nas podając swój numer telefonu.
                        <br/><br/>
                        Nasza strona internetowa umożliwia ci błyskawiczny dostęp do informacji o naszych produktach
                        oraz od razu ich zamówienia. Od teraz nie musisz martwić się, że w późnych
                        godzinach w piekarni nie znajdziesz nic dla siebie, a tylko zmarnujesz czas na podróż. Zamów
                        swoje produkty i odbierz o której godzinie tylko chcesz w naszej piekarni pamiętając że jesteśmy
                        otwarci od: <br/>
                        <strong className="text-yellow-orange-200"> Poniedziałku  do Piątku w godzinach 7:00 - 16:00 </strong> <br/>
                        <strong className="text-yellow-orange-200"> Soboty w godzinach 7:00 - 13:00 </strong> <br/>
                    </p>
                    <p className="p-4 text-xl lg:text-2xl lg:px-8 text-white text-center"
                       style={{fontFamily: 'Lucida Console, serif'}}>
                        Jeśli nasuwają ci się jakieś pytania radzimy zaznajomić się z naszym <NavLink to="/faq" className="text-yellow-orange-200 hover:text-yellow-orange-300"> FAQ</NavLink>
                    </p>
                    <div className="flex justify-center p-4">
                        <button
                            type="button"
                            onClick={handleRegisterClick}
                            className="items-center text-gray-900 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-md lg:text-lg px-5 py-2.5 me-2 mb-2"
                            style={{fontFamily: 'Lucida Console, serif'}}
                        >
                            Zarejestruj się!
                        </button>
                    </div>
                </Fade>
            </div>
            {!isLoggedIn && modalOpen === 'login' &&
                <LoginModal isOpen={true} onClose={() => setModalOpen(null)} onRegisterClick={handleRegisterClick}
                            onForgotPasswordClick={handleForgotClick}/>}
            {!isLoggedIn && modalOpen === 'register' &&
                <RegistrationModal isOpen={true} onClose={() => setModalOpen(null)} onLoginClick={handleLoginClick}/>}
            {!isLoggedIn && modalOpen === 'forgot' &&
                <ForgotPasswordModal isOpen={true} onClose={() => setModalOpen(null)}
                                     onForgotClick={handleForgotClick}/>}
        </div>);
};

export default SecSideMainPage;