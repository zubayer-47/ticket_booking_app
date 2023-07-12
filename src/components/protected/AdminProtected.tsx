import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function AdminProtected() {
    const { state } = useContext(Context);
    const location = useLocation();

    if (state.user.role === 'admin' && state.user.authenticated) return <Outlet />
    else if (state.user.authenticated) return <Navigate to='/profile' replace />

    return <Navigate to='/sign-in' replace state={{ from: location }} />
}
