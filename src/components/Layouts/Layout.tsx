import React, { ReactNode } from 'react';

type PropType = {
    children: ReactNode;
};

const Layout: React.FC<PropType> = ({ children }) => {
    return (
        <div className='relative h-screen pt-20 bg-gray-50'>{children}</div>
    );
};

export default Layout;
