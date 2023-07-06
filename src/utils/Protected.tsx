import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const auth = { token: true }
    return (
        auth.token ? <Outlet /> : <Navigate to='/sign-in' />
    )
}
