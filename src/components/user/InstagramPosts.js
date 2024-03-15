import React from 'react';
import Fade from 'react-reveal/Fade';

const InstagramPosts = ({ instagramData }) => {
    return (
        <Fade left>
            <div className="lg:w-2/5 w-full p-4 flex flex-wrap">
                {instagramData.map((post, index) => {
                    return (
                        <a key={index} href={post.permalink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 lg:w-full 2xl:w-1/2 items-center flex p-2">
                            <div className="border-4 border-gray-400 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                                <img src={post.media_url} alt={`Post ${index + 1}`} className="w-full h-auto object-cover" />
                            </div>
                        </a>
                    );
                })}
            </div>
        </Fade>
    );
};

export default InstagramPosts;
