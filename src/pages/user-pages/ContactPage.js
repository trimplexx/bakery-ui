import React, {useState} from "react";
import {Fade,Zoom, Slide} from "react-reveal";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import {useForm} from "react-hook-form";
import apiUser from "../../utils/apiUser";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit} = useForm();
    const [, setFormData] = useState({
        email: '', password: ''
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        await apiUser.contactForm(data, setIsLoading, errorNotify, successNotify);
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
            <Fade duration={1500}>
                <div className=" text-gray-800 p-2">
                    <h2 className="text-3xl mb-2 text-[Anuphan]"
                        style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>Kontakt</h2>
                    <p className="text-gray-700 py-1 text-xl" style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>
                        <strong> Trzeba Chleba</strong></p>
                    <p className="text-gray-700 py-1" style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>
                        <strong>Adres:</strong> ul. Plebiscytowa 7, 40-035 Katowice</p>
                    <p className="text-gray-700 py-1" style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>
                        <strong>Telefon:</strong> 123-456-789</p>
                    <a href="mailto:kontakt@trzebachleba.pl" style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}} className="text-gray-700 py-1 flex flex-row xl:flex-col">
                        <strong>Email: </strong> <p className="hover:text-yellow-orange-400 ml-1"> kontakt@trzebachleba.pl </p></a>
                </div>
            </Fade>

            <div className="xl:col-span-4">
                <Fade duration={2000}>
                    <div className="w-full">
                        <iframe className="w-full h-[500px]"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.9548843752195!2d19.018327776446185!3d50.25542690138699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce48f9dc1ee7%3A0x158a453af712059e!2sPlebiscytowa%207%2C%2040-035%20Katowice!5e0!3m2!1spl!2spl!4v1710526646503!5m2!1spl!2spl"
                                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </Fade>
            </div>
            <Fade duration={1500}>
                <form className="p-7 xl:col-span-4 xl:col-start-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="w-full justify-center flex">
                        <h1 className=" text-4xl text-center max-w-lg text-[#fda329] items-center mb-4">
                            Skontaktuj się z nami
                        </h1>
                    </div>
                    <p className="text-gray-700 py-1 mb-4 text-center items-center" style={{ fontFamily: 'Anuphan', lineHeight: '1.5'}}>Zauważyłeś
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
                                  placeholder=" " required/>
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
