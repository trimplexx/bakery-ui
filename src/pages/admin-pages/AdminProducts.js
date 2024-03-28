import {addImage, notFoundImage} from "../../utils/props";
import React, {useEffect, useState} from "react";
import AddNewProductModal from "../../components/admin/AddNewProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import Select from "react-select";
import {customDropdownStyles} from "../../styles/customDropdownStyles";
import {errorNotify, successNotify} from "../../helpers/ToastNotifications";
import SearchInput from "../../components/common/SearchInput";
import {FaTrashAlt} from "react-icons/fa";
import CustomPagination from "../../components/common/CustomPagination";
import apiAdmin from "../../utils/apiAdmin";
import LoadingComponent from "../../components/common/LoadingComponent";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";

const AdminProducts = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editedProductId, setEditedProductId] = useState(null);
    const [paginationNumber, setPaginationNumber] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalClosed, setIsModalClosed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [deletedProductId, setDeletedProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [productId, setProductId] = useState(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const loadingElements = () => {
        const fetchCategories = async () => {
            await apiAdmin.fetchProductCategories(setOptions, null, errorNotify);
        };

        const categories = selectedOption ? selectedOption.map(option => option.value) : null;

        if (selectedOption !== null) {
            const fetchProductsPaginationNumber = async () => {
                await apiAdmin.fetchProductsPaginationNumber(searchTerm, categories, setPaginationNumber, errorNotify);
            };
            const fetchProductsList = async () => {
                await apiAdmin.fetchProductsList(currentPage - 1, categories, searchTerm, setProducts, errorNotify);
            };

            Promise.all([fetchCategories(), fetchProductsPaginationNumber(), fetchProductsList()]).then(() => {
                setIsLoading(false);
            });

        } else {
            const fetchProductsPaginationNumber = async () => {
                await apiAdmin.fetchProductsPaginationNumber(searchTerm, null, setPaginationNumber, errorNotify);
            };
            const fetchProductsList = async () => {
                await apiAdmin.fetchProductsList(currentPage - 1, null, searchTerm, setProducts, errorNotify);
            };

            Promise.all([fetchCategories(), fetchProductsPaginationNumber(), fetchProductsList()]).then(() => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        loadingElements();
    }, [currentPage, isModalClosed, searchTerm]);

    useEffect(() => {
        setIsLoading(true);
        loadingElements();
    }, [selectedOption, deletedProductId]);


    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
        setIsModalClosed(false);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setIsModalClosed(true);
    };

    const handleOpenEditModal = (productId) => {
        setEditedProductId(productId);
        setIsModalClosed(false);
    };

    const handleCloseEditModal = () => {
        setEditedProductId(null);
        setIsModalClosed(true);
    };

    const handleDeleteProduct = async (productId) => {
        setProductId(productId);
        setIsConfirmModalVisible(true);
    };
    const handleConfirm = async () => {
        setIsLoadingDelete(true);
        await apiAdmin.deleteProduct(productId, successNotify, errorNotify);
        setDeletedProductId(productId);
        setIsLoadingDelete(false);
        setProductId(null);
        setIsConfirmModalVisible(false);
    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
        setProductId(null);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    const handleSearchInputChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (<div>
            <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 gap-4 pb-2">
                <div className="md:col-span-2 xl:col-span-1">
                    <Select
                        isMulti
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                        styles={customDropdownStyles}
                        noOptionsMessage={() => "Brak kategorii."}
                        placeholder="Wybierz kategorie produktu."
                    />
                </div>
                <div className="pb-2 md:col-start-4 xl:col-start-3 md:col-span-3 xl:col-span-3">
                    <SearchInput text="Wyszukaj produkt..." onChange={handleSearchInputChange}/>
                </div>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center mb-10">
                <div className="flex justify-center items-start py-4 px-2">
                    <div
                        className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                        <div onClick={handleOpenAddModal}>
                            <img className="rounded w-full h-full" src={addImage} alt=""/>
                        </div>
                        <h5 className="bg-[#c4c2c2] p-1 font-medium">Dodaj nowy</h5>
                    </div>
                    {isAddModalOpen && <AddNewProductModal onClose={handleCloseAddModal}/>}
                </div>
                {products && products.map(product => (<div className="flex justify-center items-start py-4 px-2">
                    <div
                        className="w-full h-full max-w-sm bg-[#c4c2c2] border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                        <div onClick={() => handleOpenEditModal(product.productId)}>
                            {product.image && product.image !== '' ? (
                                <img className="rounded w-full h-full cursor-pointer" src={product.image}
                                     alt={product.name}/>) : (
                                <img className=" w-full h-full cursor-pointer" src={notFoundImage} alt="Placeholder"/>)}
                        </div>
                        <div className="grid grid-cols-4 relative mt-1">
                            <h5 className="col-span-3 bg-[#c4c2c2] p-1 font-medium">{product.name}</h5>
                            <div className="flex justify-end items-start">
                                <button
                                    className="rounded-full bg-white p-2 hover:bg-red-200 mr-1"
                                    onClick={() => handleDeleteProduct(product.productId)}
                                >
                                    <FaTrashAlt className="text-red-500"/>
                                </button>
                            </div>
                        </div>

                        {editedProductId === product.productId && (
                            <EditProductModal onClose={handleCloseEditModal} productId={product.productId}/>)}
                    </div>
                </div>))}
            </div>
            <CustomConfirmModal
                visible={isConfirmModalVisible}
                message={`Czy na pewno chcesz usunąć ten produkt?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isLoading={isLoadingDelete}
            />
            <div className="w-full flex justify-center relative bottom-0 py-4">
                <CustomPagination paginationNumber={paginationNumber} onPageChange={handlePageChange}
                                  initialPage={currentPage}/>
            </div>
    </div>);
};

export default AdminProducts;