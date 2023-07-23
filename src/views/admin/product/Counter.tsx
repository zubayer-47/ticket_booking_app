import { useParams } from "react-router-dom";
import CenterLayout from "../../../components/Layouts/CenterLayout";

export default function Counter() {
    const params = useParams();

    console.log(params)

    return (
        <CenterLayout>
            <p className="bg-green-300">{params?.brandID || 'ss'}</p>
        </CenterLayout>
    )
}
