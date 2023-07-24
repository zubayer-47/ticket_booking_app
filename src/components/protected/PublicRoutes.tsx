import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function PublicRoutes() {
    const { state } = useContext(Context)
    // const location = useLocation();

    return !state.authenticated ?
        <Outlet />
        : state.user.role === 'admin' ? <Navigate to='/dashboard' />
            : <Navigate to='/profile' />
}
