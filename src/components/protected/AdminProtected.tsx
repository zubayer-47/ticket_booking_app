import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function AdminProtected() {
    const { state } = useContext(Context);

    return state.user.role === 'admin' ? <Outlet /> : <Navigate to='/profile' />
}
