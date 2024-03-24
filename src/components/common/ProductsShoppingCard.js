import React, {useState} from 'react';
import {FaTrashAlt} from "react-icons/fa";
import {notFoundImage} from "../../utils/props";

const ProductShoppingCard = ({product, index, date, handleDelete, handleQuantityChange}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div key={index} className={`h-32 flex mx-2 sm:mx-4 bg-gray-300 rounded mb-4 ${isLoading ? 'animate-pulse' : ''}`}>
            <img
                className="w-auto h-32 rounded-lg shadow-xl"
                src={product.image ? product.image : notFoundImage}
                alt="image description"
                onLoad={handleImageLoad}
            />
            <div className="items-start h-full justify-between flex-row">
                <div className="justify-between flex p-1 sm:p-2 w-full">
                    <h1 className="text-lg sm:text-xl font-semibold">{product.name}</h1>
                    <button
                        className="rounded-full bg-gray-300 p-2 hover:bg-white ml-auto"
                        onClick={() => handleDelete(index, date)}
                    >
                        <FaTrashAlt className="text-red-500"/>
                    </button>
                </div>
                <div className="grid grid-cols-5 p-1 sm:p-2 w-full">
                    <div className="flex justify-center col-span-2">
                        <input
                            type="number"
                            id={`quantity-${index}`}
                            step="1"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(e, index, date)}
                            aria-describedby="helper-text-explanation"
                            className="mx-2 sm:mx-4 w-full h-10 bg-transparent my-2 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block p-2"
                            placeholder="ilość"
                            required
                        />
                    </div>
                    <div className="justify-center flex items-center col-span-3">
                        <p className="text-base font-semibold px-1 sm:px-4">
                            {(product.price * product.quantity).toFixed(2)} zł
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductShoppingCard;
