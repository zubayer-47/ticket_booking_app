import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function Protected() {
    const { state } = useContext(Context);

    return (
        state.user.authenticated ? <Outlet /> : <Navigate to='/sign-in' />
    )
}
