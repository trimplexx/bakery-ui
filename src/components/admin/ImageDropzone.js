import React from 'react';
import ImageCropModal from './ImageCropModal';
import {FaTrashAlt} from "react-icons/fa";

const ImageDropzone = ({
                           backgroundImage,
                           handleFileChange,
                           handleInputClick,
                           selectedFile,
                           openModal,
                           setOpenModal,
                           setBackgroundImage,
                           handleDeleteImage
                       }) => {
    return (
        <div className="justify-center flex">
            <div className="relative w-[340px]">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {!backgroundImage && (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 ">
                                <span className="font-semibold">Zdjęcie produktu</span>
                            </p>
                            <p className="text-xs text-gray-500 ">SVG, PNG, JPG</p>
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        onClick={handleInputClick}
                    />
                    {backgroundImage && (
                        <button
                            className="absolute right-2 bottom-2 rounded-full bg-white p-2 hover:bg-red-200"
                            onClick={handleDeleteImage}
                        >
                            <FaTrashAlt className="text-red-500"/>
                        </button>
                    )}
                </label>
            </div>
            {openModal &&
                <ImageCropModal image={selectedFile} onClose={() => setOpenModal(false)} onSave={setBackgroundImage}/>}
        </div>
    );
};

export default ImageDropzone;
