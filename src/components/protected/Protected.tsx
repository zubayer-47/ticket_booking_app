import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function Protected() {
    const { state } = useContext(Context);
    const location = useLocation();

    console.log(state.user, 'protected')

    return state.user.authenticated ? <Outlet /> : <Navigate to='/sign-in' replace state={{ from: location }} />
}
