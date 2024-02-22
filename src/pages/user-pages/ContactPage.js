import React, { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import {apiKeyMap} from "../../utils/props";
import {Fade} from "react-reveal";

const ContactPage = () => {
    const position =
        {
            lat: 50.2620067,
            lng: 19.0128041,
        };
    const [open, setOpen] = useState(false);

    return (
        <div className=" bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-10 px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">

        <div className="bg-gray-200 w-full max-w-8xl py-4 sm:p-10 rounded-2xl max-w-7xl sm:grid sm:grid-cols-5 gap-4">
                <Fade left>
                <div className="mt-8 text-gray-800">
                    <h2 className="text-2xl mb-2" style={{fontFamily:'Lucida Console, serif' }}>Kontakt</h2>
                    <p className="text-gray-700" style={{fontFamily:'Lucida Console, serif' }}>Eggcellent Bakery</p>
                    <p className="text-gray-700" style={{fontFamily:'Lucida Console, serif' }}>Adres: ul. Przykładowa 123, Miasto</p>
                    <p className="text-gray-700" style={{fontFamily:'Lucida Console, serif' }}>Telefon: 123-456-789</p>
                    <p className="text-gray-700" style={{fontFamily:'Lucida Console, serif' }}>Email: kontakt@piekarnia.com</p>
                </div>
                </Fade>

                <div className="sm:col-span-4">
                    <Fade right>
                    <APIProvider apiKey={apiKeyMap}>
                        <div style={{ width: "100%", height: "400px", borderRadius: "10px", }}>
                            <Map zoom={16} center={position} mapId="d2fa563e063dc60e">
                                <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                                    <Pin
                                        background={"red"}
                                        borderColor={"white"}
                                        glyphColor={"white"}
                                    />
                                </AdvancedMarker>

                                {open && (
                                    <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                        <h2 className="text-md font-bold py-2">Eggcellent Bakery</h2>
                                        <p className="py-1">ul. Przykładowa 123</p>
                                        <p className="py-1">40-082 Katowice</p>
                                        <p className="py-1">Polska</p>
                                    </InfoWindow>
                                )}
                            </Map>
                        </div>
                    </APIProvider>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
