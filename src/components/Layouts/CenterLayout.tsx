import React, { ReactNode } from 'react';

type PropType = {
    children: ReactNode;
};

const CenterLayout: React.FC<PropType> = ({ children }) => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='w-full mx-3 md:mx-0 sm:w-3/5 md:max-w-md lg:max-w-lg p-4 bg-white rounded-xl shadow-md'>
                {children}
            </div>
        </div>
    );
};

export default CenterLayout;
