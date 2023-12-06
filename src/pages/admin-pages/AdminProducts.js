import notFoundImage from "../../graphics/not-found-image.jpg"
import addNew from "../../graphics/add-image.jpg"
import React, {useEffect, useState} from "react";
import AddNewProductModal from "../../components/admin-components/AddNewProductModal";
import EditProductModal from "../../components/admin-components/EditProductModal";
import Select from "react-select";
import {customDropdownStyles} from "../../components/admin-components/admin-styles/customDropdownStyles";
import axios from "axios";
import ConnectionUrl from "../../ConnectionUrl";

const AdminProducts = () => {
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(ConnectionUrl.connectionUrlString + 'api/AdminProducts/productsCategories')
            .then(response => {
                const newOptions = response.data.value.map(category => ({
                    value: category.categoryId,
                    label: category.name
                }));
                setOptions(newOptions);
            })
            .catch(error => {
                console.error("Error fetching categories: ", error);
            });

        axios.get(ConnectionUrl.connectionUrlString + 'api/AdminProducts/productsList')
            .then(response => {
                setProducts(response.data.value);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania produktów:', error);
            });
    }, []);



    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenNewModal = () => {
        setIsNewModalOpen(true);
    };

    const handleCloseNewModal = () => {
        setIsNewModalOpen(false);
    };

    return <>
        <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 gap-4 pb-2">
            <div className="md:col-span-2 xl:col-span-1">
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    styles={customDropdownStyles} // użyj swoich niestandardowych styli
                />
            </div>
        <form className="pb-2 md:col-span-4 xl:col-span-4">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Wyszukaj produkt..." required/>
                <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">Wyszukaj</button>
            </div>
        </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 justify-center">
            <div className="flex justify-center items-start py-4 px-2">
                <div className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                    <div onClick={handleOpenNewModal}>
                        <img className="rounded w-full h-full" src={addNew} alt="" />
                    </div>
                    <h5 className="bg-[#c4c2c2] p-1 font-medium">Dodaj nowy</h5>
                </div>
                {isNewModalOpen && <AddNewProductModal onClose={handleCloseNewModal} />}
            </div>
            {products.map(product => (
                <div className="flex justify-center items-start py-4 px-2">
                    <div className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                          <div onClick={handleOpenEditModal}>
                                {product.image && product.image !== '' ? (
                                    <img className="rounded w-full h-full cursor-pointer" src={product.image} alt={product.name} />
                                ) : (
                                    <img className=" w-full h-full cursor-pointer" src={notFoundImage} alt="Placeholder" />
                                )}
                            </div>
                            <div className="grid grid-cols-2">
                                <h5 className="bg-[#c4c2c2] p-1 font-medium">{product.name}</h5>
                                <div className="flex justify-end bg-[#c4c2c2]">
                                    <h5 className="p-1 font-medium">{product.price} zł</h5>
                                </div>
                                {isEditModalOpen && <EditProductModal onClose={handleCloseEditModal} />}
                            </div>
                        </div>
            </div>
            ))}
        </div>

    </>;
};

export default AdminProducts;