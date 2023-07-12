import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function Protected() {
    const { state } = useContext(Context);
    const location = useLocation();

    return (state.user.role === 'user' && state.user.authenticated) ?
        <Outlet /> :
        state.user.authenticated ?
            <Navigate to='/dashboard' /> :
            <Navigate to='/sign-in' replace state={{ from: location }} />
}
