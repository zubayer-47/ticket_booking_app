import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function Protected() {
    const { state } = useContext(Context);
    const location = useLocation();

    console.log(state.user.authenticated, 'from protected admin')

    if (!state.user.authenticated) {
        return <Navigate to='/sign-in' replace state={{ from: location }} />
    } else if (state.user.authenticated && state.user.role === 'user') {
        return <Outlet />
    } else {
        return <Navigate to='/dashboard' />
    }
}
