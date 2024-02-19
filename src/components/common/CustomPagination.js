import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CustomPagination = ({ paginationNumber, onPageChange, initialPage }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [initialPage, paginationNumber]);

    if (paginationNumber <= 1) {
        return null;
    }

    const pages = Array.from({ length: paginationNumber }, (_, index) => index + 1);

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < paginationNumber) {
            setCurrentPage(prevPage => prevPage + 1);
            onPageChange(currentPage + 1);
        }
    };

    let visiblePages;
    if (currentPage >= 4 && currentPage <= paginationNumber - 3) {
        visiblePages = [1, ...pages.slice(currentPage - 2, currentPage + 1), paginationNumber];
    } else if (currentPage < 4) {
        visiblePages = pages.slice(0, 4).concat([paginationNumber]);
    } else {
        visiblePages = [1].concat(pages.slice(paginationNumber - 4, paginationNumber));
    }

    return (
        <ul className="inline-flex">
            <li>
                <button
                    onClick={handlePreviousClick}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-2 sm:px-4 mx-2 h-8 sm:h-10 ms-0 mt-2 leading-tight text-gray-500
                    sm:text-lg bg-white border-2 border-yellow-400 rounded hover:bg-gray-200 hover:text-gray-700
                    focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                    <FaArrowLeft />
                </button>
            </li>
            {visiblePages.map((page, index) => (
                <li key={index}>
                    <button
                        className={`flex items-center justify-center px-2 sm:px-4 mx-2 h-8 sm:h-10 ms-0 mt-2 leading-tight text-gray-500
                    sm:text-lg bg-white border-2 border-yellow-400 rounded  hover:text-gray-700 
                    ${currentPage === page ? 'bg-yellow-400 text-white  ' : 'hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm md:text-base lg:text-lg`}
                        onClick={() => {
                            setCurrentPage(page);
                            onPageChange(page);
                        }}
                    >
                        {page}
                    </button>
                </li>
            ))}
            <li>
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === paginationNumber}
                    className="flex items-center justify-center px-2 sm:px-4 mx-2 h-8 sm:h-10 ms-0 mt-2 leading-tight text-gray-500
                    sm:text-lg bg-white border-2 border-yellow-400 rounded hover:bg-gray-200 hover:text-gray-700
                    focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                    <FaArrowRight />
                </button>
            </li>
        </ul>
    );
};

export default CustomPagination;
