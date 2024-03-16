import React from 'react';
import Fade from 'react-reveal/Fade';
import {BiCarousel} from "react-icons/bi";
import {FaRegImage} from "react-icons/fa";
import {PiPlayBold} from "react-icons/pi";

const InstagramPosts = ({instagramData}) => {
    const getIcon = (mediaType) => {
        switch (mediaType) {
            case 'CAROUSEL_ALBUM':
                return <BiCarousel className="absolute top-2 text-5xl right-2 text-gray-700 opacity-70"/>;
            case 'IMAGE':
                return <FaRegImage className="absolute top-2 text-5xl right-2 text-gray-700 opacity-70"/>;
            case 'VIDEO':
                return <PiPlayBold className="absolute top-2 text-5xl right-2 text-gray-700 opacity-70"/>;
            default:
                return null;
        }
    };

    return (
        <Fade left>
            <div className="lg:w-2/5 w-full p-4 flex flex-wrap">
                {instagramData.map((post, index) => {
                    return (
                        <a key={index} href={post.permalink} target="_blank" rel="noopener noreferrer"
                           className="w-full sm:w-1/2 lg:w-full 2xl:w-1/2 items-center flex p-2 relative">
                            <div
                                className="border-4 border-gray-400 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                                <img src={post.media_url} alt={`Post ${index + 1}`}
                                     className="w-full h-auto object-cover"/>
                                {getIcon(post.media_type)}
                            </div>
                        </a>
                    );
                })}
            </div>
        </Fade>
    );
};


export default InstagramPosts;
