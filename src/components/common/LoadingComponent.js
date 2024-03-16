import React from 'react';
import {FadeLoader} from 'react-spinners';

const LoadingComponent = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-black opacity-50 absolute inset-0 z-0"></div>
            <div className="z-10 flex flex-col items-center">
                <FadeLoader color="#fef08a"/>
                <p className="text-yellow-200 text-2xl font-bold mt-4">Ładowanie...</p>
            </div>
        </div>
    );
};

export default LoadingComponent;
