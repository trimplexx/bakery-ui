import {FaInfo} from "react-icons/fa";

export const CustomAlert = ({isVisible, type, info, handleClose}) => {
    if (!isVisible) return null;

    const alertColors = {
        error: {
            bg: 'bg-red-400',
            text: 'text-red-900',
            buttonBg: 'bg-red-300',
            buttonHover: 'hover:bg-red-200'
        },
        info: {
            bg: 'bg-blue-200 dark:bg-gray-800',
            text: 'text-blue-800 dark:text-blue-400',
            buttonBg: 'bg-blue-50 dark:bg-gray-800',
            buttonHover: 'hover:bg-blue-200 dark:hover:bg-gray-700'
        }
    };

    const colors = alertColors[type];

    return (
        <div className={`flex items-center p-4 mb-4 ${colors.text} rounded-lg ${colors.bg}`} role="alert">
            <FaInfo/>
            <div className="ms-3 text-sm font-medium">

                {info}
            </div>
            <button type="button" onClick={handleClose}
                    className={`ms-auto -mx-1.5 -my-1.5 ${colors.buttonBg} ${colors.text} rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 ${colors.buttonHover} inline-flex items-center justify-center h-8 w-8`}
                    aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
};