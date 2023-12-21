import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../common/AnimatedModal";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from 'react-select';
import {customDropdownStyles} from "../../styles/customDropdownStyles";
import {errorNotify} from "../../helpers/ToastNotifications";
import useCloseOnEsc from "../../hooks/useClonseOnEsc";
import SubmitButton from "../common/SubmitButton";
import FormInput from "../common/FormInput";
import {useForm} from "react-hook-form";
import ImageDropzone from "./ImageDropzone";
import api from "../../utils/api";
import createImageFileFromImageUrl from "../../helpers/CreateImageFileFromImageUrl";
import NutritionalTable from "./NutritionalTable";

const ProductModal = ({onClose, onSubmit, productsData, setProductsData, isLoading, text}) => {
    useCloseOnEsc(onClose);
    const {register, handleSubmit} = useForm();
    const [openModal, setOpenModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const handleDeleteImage = (event) => {
        event.preventDefault();
        setBackgroundImage(null);
        setSelectedFile(null);
        setOpenModal(false);
        setProductsData(prevState => ({
            ...prevState,
            image: null
        }));
    };

    const submitForm = async (formData) => {
        formData.category = selectedOption.value;
        if (backgroundImage) {
            const imageFile = await createImageFileFromImageUrl(backgroundImage, formData.name, errorNotify);
            if (imageFile) {
                formData.image = imageFile;
            } else {
                formData.image = null;
            }
            setProductsData(prevState => ({
                ...prevState,
                image: backgroundImage
            }));
            console.log(backgroundImage, ":Fota");
        }
        await onSubmit(formData);
    };

    const handleChange = (option) => {
        setSelectedOption(option);
        setProductsData(prevState => ({
            ...prevState,
            category: option.value
        }));
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(URL.createObjectURL(event.target.files[0]));
            setOpenModal(true);
        }
    };

    const handleInputClick = (event) => {
        event.target.value = '';
    };

    useEffect(() => {
        const fetchData = async () => {
            await api.fetchProductCategories(setOptions, errorNotify);
        };
        fetchData();

    }, [setOptions]);

    useEffect(() => {
        if (productsData && options.length > 0) {
            setBackgroundImage(productsData.image);
            const foundCategory = options.find(option => option.value === productsData.category);
            if (foundCategory) {
                setSelectedOption(foundCategory);
            }
        }
    }, [productsData, options, setBackgroundImage, setSelectedOption]);

    const handleInputChange = (id, newValue) => {
        setProductsData(prevData => ({ ...prevData, [id]: newValue }));
    };

    return (<div className="fixed inset-0 z-50">
        <AnimatedModal onClose={onClose}>
            <form onSubmit={handleSubmit(submitForm)}
                  className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen">
                <h1 className="mb-4 text-4xl text-center w-auto font-semibold leading-loose text-[#fda329] ">{text}</h1>
                <div className="grid md:grid-cols-5 gap-4 grid-cols-1 justify-center">
                    <div className="md:col-span-2 ">
                        <ImageDropzone
                            backgroundImage={backgroundImage}
                            handleFileChange={handleFileChange}
                            handleInputClick={handleInputClick}
                            selectedFile={selectedFile}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            setBackgroundImage={(imageData) => {
                                setProductsData(prevState => ({
                                    ...prevState,
                                    image: imageData
                                }));
                                setBackgroundImage(imageData);
                            }}
                            handleDeleteImage={handleDeleteImage}
                        />

                        <div className="mt-4">
                            <FormInput register={register} id="name" label="Nazwa produktu" type="text" maxLength="45"
                                       value={productsData.name} onChange={(e) => handleInputChange('name', e.target.value)}/>
                        </div>
                        <div className="w-auto flex mt-4">
                            <div className="relative w-full">
                                <FormInput register={register} id="price" label="Cena" type="text" maxLength="10"
                                           value={productsData.price} onChange={(e) => handleInputChange('price', e.target.value)}/>
                            </div>
                            <span
                                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg">
                                   <span className="fi fi-pl mr-2"></span> PLN
                                </span>
                        </div>
                        <div className="mt-4">
                            <FormInput register={register} id="weight" label="Masa netto (G)" type="number" maxLength="20"
                                       value={productsData.weight} onChange={(e) => handleInputChange('weight', e.target.value)}/>
                        </div>
                        <div className="relative mt-4">
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                                styles={customDropdownStyles}
                                required
                            />
                        </div>
                    </div>
                    <NutritionalTable register={register} productsData={productsData} setProductsData={setProductsData}/>
                    <div className="relative md:col-span-5">
                            <textarea id="description" {...register("description")}
                                      value={productsData.description}
                                      maxLength="1000"
                                      onChange={(e) => handleInputChange('description', e.target.value)}
                                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                      placeholder=" " required/>
                        <label htmlFor="description"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Opis</label>
                    </div>
                    <div className=" md:col-start-2 md:col-span-3 w-full">
                        <SubmitButton isLoading={isLoading} text={text}/>
                    </div>
                </div>

            </form>
        </AnimatedModal>
    </div>);
};

export default ProductModal;