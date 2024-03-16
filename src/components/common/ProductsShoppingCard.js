import React, {useState} from 'react';
import {FaTrashAlt} from "react-icons/fa";
import {notFoundImage} from "../../utils/props";

const ProductShoppingCard = ({product, index, date, handleDelete, handleQuantityChange}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div key={index} className={`flex sm:mx-4 bg-gray-300 rounded mb-4 ${isLoading ? 'animate-pulse' : ''}`}>
            <img
                className="w-40 h-auto rounded-lg shadow-xl"
                src={product.image ? product.image : notFoundImage}
                alt="image description"
                onLoad={handleImageLoad}
            />
            <div className="items-start w-full">
                <div className="justify-between flex p-1 sm:p-2">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                    <button
                        className="rounded-full bg-gray-300 p-2 hover:bg-white ml-auto"
                        onClick={() => handleDelete(index, date)}
                    >
                        <FaTrashAlt className="text-red-500"/>
                    </button>
                </div>
                <div className="sm:grid sm:grid-cols-2 p-1 sm:p-2 ">
                    <div className="flex justify-center">
                        <input
                            type="number"
                            id={`quantity-${index}`}
                            step="1"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(e, index, date)}
                            aria-describedby="helper-text-explanation"
                            className="mx-4 w-full h-10 bg-transparent my-2 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block p-2"
                            placeholder="ilość"
                            required
                        />
                    </div>
                    <div className="justify-center flex items-center">
                        <p className="text-base font-semibold px-4">
                            {(product.price * product.quantity).toFixed(2)} zł
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShoppingCard;
