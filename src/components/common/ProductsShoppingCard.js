import React from 'react';
import {FaTrashAlt} from "react-icons/fa";

const ProductShoppingCard = ({ product, index,handleDelete, handleQuantityChange }) => {
    return (
        <div key={index} className="flex mx-4 bg-gray-300 rounded mb-4">
            <img className="w-44 h-auto rounded-lg shadow-xl" src={product.image} alt="image description" />
            <div className="items-start w-full">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                    <button
                        className="rounded-full bg-gray-300 p-2 hover:bg-white ml-auto"
                        onClick={() => handleDelete(index)}
                    >
                        <FaTrashAlt className="text-red-500" />
                    </button>
                </div>

                <div className="grid grid-cols-2">
                    <div className="flex justify-center">
                        <input
                            type="number"
                            id={`quantity-${index}`}
                            step="1"
                            min="0"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(e, index)}
                            aria-describedby="helper-text-explanation"
                            className="mx-4 w-20 h-10 z-20 bg-transparent my-2 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block p-2"
                            placeholder="ilość"
                            required
                        />
                    </div>
                    <div className="justify-center flex items-center">
                        <p className="text-lg font-semibold px-4">
                            Cena: {(product.price * product.quantity).toFixed(2)} zł
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShoppingCard;
