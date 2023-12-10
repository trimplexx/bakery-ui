import {addImage} from "../../utils/props";
import {notFoundImage} from "../../utils/props";
import React, {useEffect, useState} from "react";
import AddNewProductModal from "../../components/admin/AddNewProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import Select from "react-select";
import {customDropdownStyles} from "../../styles/customDropdownStyles";
import {connectionUrlString} from "../../utils/props";
import {errorNotify} from "../../helpers/ToastNotifications";
import SearchInput from "../../components/common/SearchInput";
import api from "../../utils/api";

const AdminProducts = () => {
    const [openProductId, setOpenProductId] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            await api.fetchProductCategories(connectionUrlString, setOptions, errorNotify);
        };

        const fetchProducstList = async () => {
            await api.fetchProductsList(connectionUrlString, setProducts, errorNotify);
        };


        fetchCategories();
        fetchProducstList();
    }, []);

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleOpenEditModal = (productId) => {
        setOpenProductId(productId);
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
                    styles={customDropdownStyles}
                />
            </div>
            <div className="pb-2 md:col-start-4 xl:col-start-3 md:col-span-3 xl:col-span-3" >
                <SearchInput text="Wyszukaj produkt..."/>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center">
            <div className="flex justify-center items-start py-4 px-2">
                <div className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                    <div onClick={handleOpenNewModal}>
                        <img className="rounded w-full h-full" src={addImage} alt="" />
                    </div>
                    <h5 className="bg-[#c4c2c2] p-1 font-medium">Dodaj nowy</h5>
                </div>
                {isNewModalOpen && <AddNewProductModal onClose={handleCloseNewModal} />}
            </div>
            {products && products.map(product => (
                <div className="flex justify-center items-start py-4 px-2">
                    <div className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                          <div onClick={() => handleOpenEditModal(product.productId)}>
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
                                </div >
                                {isEditModalOpen && <EditProductModal  onClose={handleCloseEditModal} productId={openProductId}/>}
                            </div>
                        </div>
            </div>
            ))}
        </div>

    </>;
};

export default AdminProducts;