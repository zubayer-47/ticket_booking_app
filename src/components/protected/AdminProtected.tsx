import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function AdminProtected() {
    const { state } = useContext(Context);
    const location = useLocation();

    console.log(state.user.role === 'admin', state.user)

    return (state.user.role === 'admin' && state.user.authenticated) ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}
