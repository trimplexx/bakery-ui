import React, {useEffect, useState} from "react";
import {AnimatedModal} from "../user-components/AnimatedModal";
import {motion} from "framer-motion";

const EditProductModal = ({onClose}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keyup", handleEscKey);
        return () => window.removeEventListener("keyup", handleEscKey);
    }, [onClose]);

    const buttonVariants = {
        hover: {
            scale: 0.95,
            transition: {
                duration: 0.3,
                yoyo: Infinity  // powtarza animację
            }
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <AnimatedModal>
                <form className="add-product-form bg-white p-8 rounded-lg shadow-md w-auto h-auto overflow-auto max-h-screen">
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
                    <h1 className="mb-4 text-4xl text-center w-auto font-semibold leading-loose text-[#fda329] ">Edytuj
                        produkt</h1>
                    <div className="grid md:grid-cols-5 gap-4 grid-cols-1 justify-center">
                        <div className="md:col-span-2 ">
                            <div className="justify-center flex">
                                <div className="flex items-center justify-center w-64">
                                    <label htmlFor="dropzone-file"
                                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 "
                                                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                      stroke-width="2"
                                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 "><span
                                                className="font-semibold">Zdjęcie produktu</span></p>
                                            <p className="text-xs text-gray-500 ">SVG, PNG, JPG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden"/>
                                    </label>
                                </div>
                            </div>
                            <div className="relative mt-6">
                                <input type="text" id="name"
                                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                       placeholder=" " required/>
                                <label htmlFor="name"
                                       className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nazwa
                                    produktu</label>
                            </div>
                            <div className="w-auto flex mt-4">
                                <div className="relative w-full">
                                    <div className="relative">
                                        <input type="number" id="price"
                                               className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                               placeholder=" " required/>
                                        <label htmlFor="price"
                                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                            Cena
                                        </label>
                                    </div>
                                </div>
                                <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg">
                                   <span className="fi fi-pl mr-2"></span> PLN
                                </span>
                            </div>
                            <div className="relative mt-4">
                                <input type="number" id="mass"
                                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                       placeholder=" " required/>
                                <label htmlFor="mass"
                                       className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Masa netto (G)</label>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Wartość odżywcza (100g produktu)
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ilość
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Wartość energetyczna (KJ/KCAL)
                                        </th>
                                        <td className="px-6 py-1">
                                            <div className="grid grid-cols-3 items-center w-auto">
                                                <input type="number" id="kj-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-20 p-2" placeholder="kJ" required/>
                                                <div className="text-center mx-0">/</div>
                                                <input type="number" id="kcal-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-20 p-2" placeholder="Kcal" required/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Tłuszcz (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="fats" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="tłuszcz" required/>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Kwasy tłuszczowe nasycone (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="saturated-fats" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="tłuszcze nasycone" required/>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Węglowodany (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="carbohydrates" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="węglowodany" required/>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Cukry (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="sugar" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="cukry" required/>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Białka (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="protein" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="białko" required/>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Sól (G)
                                        </th>
                                        <td className="px-6 py-1">
                                            <input type="number" id="salt" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="sól" required/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="relative md:col-span-5">
                            <textarea id="description"
                                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fda329] peer"
                                      placeholder=" " required/>
                            <label htmlFor="description"
                                   className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#fda329] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Opis</label>
                        </div>
                        <div className=" md:col-start-2 md:col-span-3 w-full">
                            {!isLoading && (<motion.button
                                className="bg-yellow-400 p-2 rounded text-white w-full"
                                type="submit"
                                variants={buttonVariants}
                                whileHover="hover"
                            > Zapisz zmiany
                            </motion.button>)
                            }
                            {isLoading && (<motion.button
                                className="bg-yellow-400 p-2 rounded text-white w-full"
                                disabled
                                type="button"
                            >
                                {isLoading ? (
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    'Zapisz zmiany'
                                )}
                            </motion.button>)
                            }
                        </div>
                    </div>

                </form>
            </AnimatedModal>
        </div>);
};

export default EditProductModal;