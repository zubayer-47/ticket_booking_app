import { useContext } from "react";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { Context } from "../../contexts/Context";

export default function OrderHistory() {
    const { state } = useContext(Context);

    return (
        <CenterLayout smWidth>
            <ul className="space-y-2">
                {state.user.ticket.map(t => (
                    <li className={`border-b`} key={t.id}>{t.seatName}</li>
                ))}
            </ul>
        </CenterLayout>
    )
}
