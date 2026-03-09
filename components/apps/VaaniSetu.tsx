import React from 'react';

const VaaniSetu: React.FC = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col">
            <iframe
                src="https://vaani-setu-website.vercel.app/"
                className="w-full h-full border-none flex-1"
                title="Vaani Setu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default VaaniSetu;
