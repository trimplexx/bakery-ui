import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {AnimatedModal} from "../user-components/AnimatedModal";
import { getCroppedImg } from './canvasUtils'

const ImageCropModal = ({ image, onClose, onSave }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = async () => {
        const croppedImage = await getCroppedImg(
            image,
            croppedAreaPixels
        );
        onSave(croppedImage);
        onClose();
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <AnimatedModal>
                <div className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen">
                    <div className="flex space-x-1 justify-end">
                        <button type="button" onClick={onClose}
                                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    <div className="relative w-[1024px] h-[600px] bg-gray-300 my-4">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="justify-end flex">
                        <button onClick={createImage} className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none font-medium rounded-lg text-sm w-36 px-5 py-2.5 text-center">Zapisz</button>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
};

export default ImageCropModal;
