import React, {useCallback, useState} from "react";
import Cropper from "react-easy-crop";
import {AnimatedModal} from "../common/AnimatedModal";
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

    return (
        <div className="fixed inset-0 z-50">
            <AnimatedModal onClose={onClose}>
                <div
                    className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen">
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
                        <button onClick={createImage} type="button"
                                className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none font-medium rounded-lg text-sm w-36 px-5 py-2.5 text-center">Zapisz
                        </button>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
};

export default ImageCropModal;
