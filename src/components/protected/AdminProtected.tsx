import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function AdminProtected() {
    const { state } = useContext(Context);
    const location = useLocation();

    if (!state.user.authenticated) {
        return <Navigate to='/sign-in' replace state={{ from: location }} />
    } else if (state.user.authenticated && state.user.role === 'admin') {
        return <Outlet />
    } else {
        return <Navigate to='/profile' replace />
    }
}
