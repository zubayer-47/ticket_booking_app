import React, { ReactNode, useContext } from 'react';
import { Context } from '../../contexts/Context';

type PropType = {
    children: ReactNode;
};

const Layout: React.FC<PropType> = ({ children }) => {
    const { state } = useContext(Context);

    return (
        <div className={`relative h-screen bg-gray-50 ${state.isLoading ? 'pt-0' : 'pt-20'}`}>{children}</div>
    );
};

export default Layout;
