import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../../contexts/Context';

export default function PublicRoutes() {
    const { state: { user } } = useContext(Context)
    // const location = useLocation();

    return !user.authenticated ?
        <Outlet />
        : user.role === 'admin' ? <Navigate to='/dashboard' />
            : <Navigate to='/profile' />
}
