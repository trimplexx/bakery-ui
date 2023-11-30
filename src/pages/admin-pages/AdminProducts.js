import image from "../../graphics/chleb.png"
import addNew from "../../graphics/add-new-product.png"
import React, {useState} from "react";
import AddNewProductModal from "../../components/admin-components/AddNewProductModal";
import EditProductModal from "../../components/admin-components/EditProductModal";

const AdminProducts = () => {
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        <form className="pb-4">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Wyszukaj produkt..." required/>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">Wyszukaj</button>
            </div>
        </form>
        <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:text-yellow-400 focus:outline-none bg-white rounded-full border border-yellow-300 hover:bg-gray-100 hover:text-yellow-500 focus:z-10 focus:ring-4 focus:ring-yellow-400">Kategorie</button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-center">
            <div className="flex justify-center items-start py-4 px-2">
                <div className="w-full max-w-sm bg-white border-4 border-[#c4c2c2] hover:border-yellow-300 rounded-lg shadow cursor-pointer">
                    <div onClick={handleOpenNewModal}>
                        <img className="rounded-t-lg w-full h-full" src={addNew} alt="" />
                    </div>
                    <h5 className="bg-[#c4c2c2] p-1 font-medium">Dodaj nowy</h5>
                </div>
                {isNewModalOpen && <AddNewProductModal onClose={handleCloseNewModal} />}
            </div>
            <div className="flex justify-center items-start py-4 px-2">
                <div className="w-full max-w-sm bg-white border-4 border-[#c4c2c2] rounded-lg shadow hover:border-yellow-300">
                    <div onClick={handleOpenEditModal}>
                        <img className="rounded-t-lg w-full h-full cursor-pointer" src={image} alt=""/>
                    </div>
                    <div className="grid grid-cols-2">
                        <h5 className="bg-[#c4c2c2] p-1 font-medium">Nazwa</h5>
                        <div className="flex justify-end bg-[#c4c2c2]">
                            <h5 className="p-1 font-medium">5,99zł</h5>
                        </div>
                        {isEditModalOpen && <EditProductModal onClose={handleCloseEditModal} />}
                    </div>
                </div>
            </div>
        </div>

    </>;
};

export default AdminProducts;