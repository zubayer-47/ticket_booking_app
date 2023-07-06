import { Outlet, useNavigate } from "react-router-dom";

export default function CancelTicket() {
    const navigate = useNavigate();
    const isAuth = false;

    return (

        <>
            {!isAuth ? (<Outlet />) : navigate('/cancel-ticket')}
        </>
    )
}
