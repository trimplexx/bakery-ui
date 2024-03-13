import React, {useState} from "react";
import {AdvancedMarker, APIProvider, InfoWindow, Map, Pin,} from "@vis.gl/react-google-maps";
import {apiKeyMap} from "../../utils/props";
import {Fade} from "react-reveal";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import {useForm} from "react-hook-form";
import apiUser from "../../utils/apiUser";
import {errorNotify} from "../../helpers/ToastNotifications";

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit} = useForm();
    const [open, setOpen] = useState(false);
    const position = {
        lat: 50.2620067, lng: 19.0128041,
    };
    const [formData, setFormData] = useState({
        email: '', password: ''
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        await apiUser.login(data, setIsLoading, errorNotify);
    };
    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData, [field]: value
        }));
    };

    return (<div
            className=" bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-2 px-2 sm:p-10 sm:px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">
            <div
                className="bg-gray-200 w-full max-w-8xl py-4 sm:p-10 rounded-2xl max-w-7xl xl:grid xl:grid-cols-5 gap-4">
                <Fade left>
                    <div className=" text-gray-800 p-2">
                        <h2 className="text-2xl mb-2 text-[lucida-console]"
                            style={{fontFamily: 'Lucida Console, serif'}}>Kontakt</h2>
                        <p className="text-gray-700 py-1" style={{fontFamily: 'Lucida Console, serif'}}>Eggcellent
                            Bakery</p>
                        <p className="text-gray-700 py-1" style={{fontFamily: 'Lucida Console, serif'}}>
                            <strong>Adres:</strong> ul. Przykładowa 123, Miasto</p>
                        <p className="text-gray-700 py-1" style={{fontFamily: 'Lucida Console, serif'}}>
                            <strong>Telefon:</strong> 123-456-789</p>
                        <p className="text-gray-700 py-1" style={{fontFamily: 'Lucida Console, serif'}}>
                            <strong>Email:</strong> kontakt@piekarnia.com</p>
                    </div>
                </Fade>

                <div className="xl:col-span-4">
                    <Fade right>
                        <APIProvider apiKey={apiKeyMap}>
                            <div style={{width: "100%", height: "400px", borderRadius: "10px",}}>
                                <Map zoom={16} center={position} mapId="d2fa563e063dc60e">
                                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                                        <Pin
                                            background={"red"}
                                            borderColor={"white"}
                                            glyphColor={"white"}
                                        />
                                    </AdvancedMarker>

                                    {open && (<InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                            <h2 className="text-md font-bold py-2">Trzeba Chleba</h2>
                                            <p className="py-1">ul. Przykładowa 123</p>
                                            <p className="py-1">40-082 Katowice</p>
                                            <p className="py-1">Polska</p>
                                        </InfoWindow>)}
                                </Map>
                            </div>
                        </APIProvider>
                    </Fade>
                </div>
                <Fade right>
                <form className="p-7 xl:col-span-4 xl:col-start-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="w-full justify-center flex">
                    <h1 className=" text-4xl text-center max-w-lg font-serif leading-loose text-[#fda329] items-center">
                        Skontaktuj się z nami
                    </h1>
                    </div>
                    <p className="text-gray-700 py-1 mb-4" style={{fontFamily: 'Lucida Console, serif'}}>Zauważyłeś
                        jakiś problem na naszej stronie, bądź masz jakieś pytanie? Wypełnij formularz swoimi danymi oraz
                        wiadomością, którą chcesz do nas dostarczyć, a my odezwiemy się w wiadomości mailowej tak szybko
                        jak to będzie możliwe.</p>
                    <div className="grid gap-6 mb-6 sm:grid-cols-2">
                        <FormInput register={register} id="firstName" label="Imie" type="text" maxLength="40"
                                   color="gray-200" onChange={(e) => handleInputChange('firstName', e.target.value)}/>
                        <FormInput register={register} id="lastName" label="Nazwisko" type="text" maxLength="50"
                                   color="gray-200" onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                    </div>
                    <div className="grid gap-6 mb-6 sm:grid-cols-2">
                        <FormInput register={register} id="phone" label="Numer telefonu" type="text" maxLength="9"
                                   color="gray-200" onChange={(e) => handleInputChange('phone', e.target.value)}/>
                        <FormInput register={register} id="email" label="Email" type="email" maxLength="50"
                                   color="gray-200" onChange={(e) => handleInputChange('email', e.target.value)}/>
                    </div>
                    <div className="relative md:col-span-5">
                        <textarea id="message" {...register("message")}
                            maxLength="4000"
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            className="block px-2.5 h-36 pb-2.5 pt-4 mb-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                            placeholder=" " required />
                        <label htmlFor="message"
                               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Wiadomość</label>
                    </div>
                    <SubmitButton isLoading={isLoading} text="Wyślij wiadomość"/>
                </form>
                </Fade>
            </div>
        </div>);
};

export default ContactPage;
