import React, { useState, useEffect } from 'react';

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

    return (
            <ul className="inline-flex">
                <li>
                    <button
                        onClick={handlePreviousClick}
                        className="flex items-center justify-center px-4 mx-2 h-10 ms-0 leading-tight text-gray-500 text-lg font-bold bg-white border-2 border-yellow-400 rounded hover:bg-gray-200 hover:text-gray-700 "
                    >
                        Poprzednia
                    </button>
                </li>
                {pages.map(page => (
                    <li key={page}>
                        <button
                            className={`flex items-center justify-center px-4 mx-2 h-10 ms-0 leading-tight text-gray-500 text-lg font-bold border-2 border-yellow-400 rounded hover:bg-gray-100 hover:text-gray-700 ${
                                currentPage === page ? 'bg-gray-300' : ''
                            }`}
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
                        className="flex items-center justify-center px-4 mx-2 h-10 ms-0 leading-tight text-gray-500 text-lg font-bold bg-white border-2 border-yellow-400 rounded hover:bg-gray-200 hover:text-gray-700"
                    >
                        Następna
                    </button>
                </li>
            </ul>
    );
};

export default CustomPagination;
