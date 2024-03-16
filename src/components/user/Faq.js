import {FaAngleDown} from "react-icons/fa";

const Faq = ({faq, index, toggleFAQ}) => {
    return (
        <div
            className={`faq ${faq.open ? 'open' : ''} m-4 p-4 bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-full`}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <div
                className="faq-question flex justify-between items-center text-lg tracking-wide text-yellow-orange-500 font-medium uppercase">
                {faq.question}
                <span className={`transform transition-transform duration-500 ${faq.open ? 'rotate-180' : ''}`}>
                    <FaAngleDown className="text-3xl font-bold"/>
                </span>
            </div>
            {faq.open && <div
                className="mt-2 p-6 faq-answer text-gray-700 transition-all duration-1000 ease-in-out delay-500">{faq.answer}</div>}
        </div>
    );
};

export default Faq;
