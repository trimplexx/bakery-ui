import React, {useCallback, useState} from "react";
import Cropper from "react-easy-crop";
import { motion } from "framer-motion";
import {getCroppedImg} from '../../utils/canvasUtils'

const ImageCropModal = ({image, onClose, onSave}) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
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
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 30,
                stiffness: 200,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };

    return (
        <div className="fixed inset-0 z-50 w-[50vh] sm:w-[100vh]">
            <div className="modal z-50">
                <motion.div
                    className="bg-white rounded-lg shadow-lg"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="absolute top-3 right-3 overflow-y-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                <div
                    className="add-product-form bg-white w-[50vh] sm:w-[100vh] p-8 rounded-lg shadow-md  h-auto  overflow-auto max-h-screen">
                    <div className="relative w-full h-[500px] bg-gray-300 my-4">
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
                        <button onClick={createImage} type="button"
                                className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none font-medium rounded-lg text-sm w-36 px-5 py-2.5 text-center">Zapisz
                        </button>
                    </div>
                </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ImageCropModal;
