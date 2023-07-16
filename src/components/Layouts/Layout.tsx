import React, { ReactNode, useContext } from 'react';
import { Context } from '../../contexts/Context';

type PropType = {
    children: ReactNode;
};

const Layout: React.FC<PropType> = ({ children }) => {
    const { state } = useContext(Context);

    return (
        <div className={`relative h-screen bg-gray-50 ${state.isLoading ? 'pt-0' : 'pt-20'}`}>
            <div className='mx-5 h-full max-w-full lg:max-w-4xl lg:mx-auto xl:max-w-5xl'>
                {children}
            </div>
        </div>
    );
};

export default Layout;
