import React, { ReactNode, useContext } from 'react';
import { Context } from '../../contexts/Context';

type PropType = {
    children: ReactNode;
};

const Layout: React.FC<PropType> = ({ children }) => {
    const { state } = useContext(Context);

    return (
        <div className={`relative h-screen ${state.isLoading ? 'pt-0' : 'pt-20'} bg-gray-50`}>{children}</div>
    );
};

export default Layout;
