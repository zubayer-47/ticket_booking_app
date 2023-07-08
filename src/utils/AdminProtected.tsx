import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtected() {
    const auth = { role: 'admin' };
    return (
        auth.role === 'admin' ? <Outlet /> : <Navigate to='/profile' />
    )
}
